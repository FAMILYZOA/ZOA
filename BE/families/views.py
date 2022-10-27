from django.shortcuts import get_object_or_404, render
from rest_framework.generics import (
    CreateAPIView,RetrieveUpdateDestroyAPIView,UpdateAPIView)
from accounts.models import User
from django.http import JsonResponse
from families.models import Family, FamilyInteractionName
from .serializers import FamilyNameSetSerializer, FamilyRetriveSerializer, FamilySerializer, FamilyUpdateSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

class FamilyCreateAPIView(CreateAPIView) :
    serializer_class = FamilySerializer
    queryset = Family.objects.all()

    def create(self, request, *args, **kwargs):
        if request.user.family_id :
            return Response({'user님은 이미 가족에 가입되어 있습니다.'},status=status.HTTP_400_BAD_REQUEST)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        family = get_object_or_404(Family,id=serializer.data['id'])
        family.users.add(request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class FamilyAPIView(RetrieveUpdateDestroyAPIView) :

    serializer_class = FamilyRetriveSerializer
    queryset=Family.objects.all()
    lookup_field = 'id'
    def retrieve(self, request, id,*args, **kwargs):
        # instance = self.get_object()
        instance = get_object_or_404(Family,id=id)
        print(instance.users.all())
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        if request.user.family_id != self.get_object():
            return Response({'변경 권한이 없습니다.'},status=status.HTTP_403_FORBIDDEN)
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = FamilyUpdateSerializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)



@swagger_auto_schema(
        method='post',
     responses={
        200: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'success' : openapi.Schema('user님이 family에 가입되었습니다.',type=openapi.TYPE_STRING)
            }
        ),

        400: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'fail' : openapi.Schema('user님은 이미 가족에 가입되어 있습니다.',type=openapi.TYPE_STRING)
            }
        )

     }
)
@api_view(['POST'])
def UserJoinFamily(request,family_id) :
    user = request.user
    family = get_object_or_404(Family,id=family_id)
    if request.user.is_authenticated :
        if user.family_id :
            context = {
                'fail' : f'{user.name}님은 이미 가족에 가입되어 있습니다.'
            }
            return JsonResponse(context,status=status.HTTP_400_BAD_REQUEST)
        else :
            family.users.add(user)
            context = {
                'success' : f'{user.name}님이 {family.name}에 가입되었습니다.'
            }
            return JsonResponse(context,status=status.HTTP_200_OK)


class FamilyNameSetAPIView(CreateAPIView,UpdateAPIView) :

    serializer_class = FamilyNameSetSerializer
    queryset = User.objects.all()
    lookup_field = 'id'

    def create(self, request, *args, **kwargs):
        to_user = self.get_object()
        if FamilyInteractionName.objects.filter(to_user=to_user,from_user=self.request.user).exists() :
            return Response({f'이미 {to_user}님의 이름을 설정했습니다. 이름 수정만 가능합니다.'},status=status.HTTP_400_BAD_REQUEST)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    def perform_create(self, serializer):
        serializer.save(to_user=self.get_object(),from_user=self.request.user,family=self.request.user.family_id)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = get_object_or_404(FamilyInteractionName,to_user=self.get_object(),from_user=self.request.user)
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data,status=status.HTTP_200_OK)

    def perform_update(self, serializer):
        serializer.save()

