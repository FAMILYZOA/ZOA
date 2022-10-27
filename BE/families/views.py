from django.shortcuts import get_object_or_404, render
from rest_framework.generics import (
    CreateAPIView,RetrieveUpdateDestroyAPIView,mixins)
from accounts.models import User
from django.http import JsonResponse
from families.models import Family
from .serializers import FamilyRetriveSerializer, FamilySerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

class FamilyCreateAPIView(CreateAPIView) :
    serializer_class = FamilySerializer
    queryset = Family.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        family = Family.objects.get(id=serializer.data['id'])
        family.users.add(request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class FamilyAPIView(RetrieveUpdateDestroyAPIView) :

    serializer_class = FamilyRetriveSerializer
    queryset=Family.objects.all()
    lookup_field = 'id'
    def retrieve(self, request, id,*args, **kwargs):
        # instance = self.get_object()
        instance = Family.objects.get(id=id)
        print(instance.users.all())
        serializer = self.get_serializer(instance)
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