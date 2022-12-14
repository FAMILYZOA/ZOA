from django.shortcuts import get_object_or_404
from rest_framework.generics import (
    CreateAPIView,RetrieveUpdateDestroyAPIView,UpdateAPIView,GenericAPIView,RetrieveAPIView)
from rest_framework import mixins,permissions
from accounts.models import User
from accounts.permissions import InFamilyorBadResponsePermission
from families.models import Family, FamilyInteractionName, InvitationCodeFamily
from .serializers import FamilyNameSetSerializer, FamilyRetriveSerializer, FamilySerializer, FamilyUnAuthorizedRetriveSerializer, FamilyUpdateSerializer, InvitationCodeFamilySerializer, CodeFamilySerializer, FamilySecessionSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
import uuid
import base64
import codecs
import datetime
import threading


class FamilyCreateAPIView(GenericAPIView,mixins.CreateModelMixin) :
    serializer_class = FamilySerializer
    queryset = Family.objects.all()
    @swagger_auto_schema(operation_summary="가족 생성")
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
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
    permission_classes = [InFamilyorBadResponsePermission]
    @swagger_auto_schema(operation_summary="가족 및 멤버 조회")
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    @swagger_auto_schema(operation_summary="가족 이름 수정",request_body=FamilyUpdateSerializer, responses={200: FamilyUpdateSerializer})
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = FamilyUpdateSerializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    @swagger_auto_schema(operation_summary="가족 삭제")
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


@swagger_auto_schema(
        method='post',
        operation_summary="가족에 가입",
     responses={
        200: openapi.Schema(type=openapi.TYPE_OBJECT,
            properties={'success' : openapi.Schema('user님이 family에 가입되었습니다.',type=openapi.TYPE_STRING)}
        ),
        400: openapi.Schema(type=openapi.TYPE_OBJECT,
        properties={'fail' : openapi.Schema('user님은 이미 가족에 가입되어 있습니다.',type=openapi.TYPE_STRING)}
        )})
@api_view(['POST'])
def UserJoinFamily(request,family_id) :
    user = request.user
    family = get_object_or_404(Family,id=family_id)
    if request.user.is_authenticated :
        if user.family_id :
            context = {'fail' : f'{user.name}님은 이미 가족에 가입되어 있습니다.'}
            return Response(context,status=status.HTTP_400_BAD_REQUEST)
        else :
            family.users.add(user)
            serializer = FamilyUpdateSerializer(family)
            return Response(serializer.data,status=status.HTTP_200_OK)

class FamilyNameSetAPIView(CreateAPIView,UpdateAPIView) :
    
    serializer_class = FamilyNameSetSerializer
    queryset = Family.objects.all()
    permission_classes = [InFamilyorBadResponsePermission]
    lookup_field = 'id'

    def get_user(self) :
        lookup_url_kwarg =  self.lookup_field
        queryset = User.objects.all()
        filter_kwargs = {self.lookup_field: self.kwargs[lookup_url_kwarg]}
        obj = get_object_or_404(queryset, **filter_kwargs)

        return obj

    @swagger_auto_schema(operation_summary="가족 구성원 이름 설정")
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    @swagger_auto_schema(operation_summary="가족 구성원 이름 변경")
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    
    def create(self, request, *args, **kwargs):
        to_user = self.get_user()
        from_user=self.request.user
        if to_user == from_user :
            return Response({f'자신의 이름은 설정할 수 없습니다.'},status=status.HTTP_400_BAD_REQUEST)
        
        if  not to_user.family_id or from_user.family_id != to_user.family_id :
            return Response({f'우리 가족이 아닙니다.'},status=status.HTTP_403_FORBIDDEN)
        
        if FamilyInteractionName.objects.filter(to_user=to_user,from_user=from_user).exists() :
            return Response({f'이미 {to_user}님의 이름을 설정했습니다. 이름 수정만 가능합니다.'},status=status.HTTP_400_BAD_REQUEST)
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    def perform_create(self, serializer):
        serializer.save(to_user=self.get_user(),from_user=self.request.user,family=self.request.user.family_id)

    def update(self, request, *args, **kwargs):
        if self.get_user() == self.request.user :
            return Response({f'자신의 이름은 설정할 수 없습니다.'},status=status.HTTP_400_BAD_REQUEST)
        partial = kwargs.pop('partial', False)
        instance = get_object_or_404(FamilyInteractionName,to_user=self.get_user(),from_user=self.request.user)
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            instance._prefetched_objects_cache = {}

        return Response(serializer.data,status=status.HTTP_200_OK)

    def perform_update(self, serializer):
        serializer.save()

class FamilySignAPIView(RetrieveAPIView) :

    serializer_class = FamilyUnAuthorizedRetriveSerializer
    queryset=Family.objects.all()
    lookup_field = 'id'
    permission_classes = [ permissions.AllowAny ]
    @swagger_auto_schema(operation_summary="가족 및 멤버 조회")
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)


class InviteCodeFamilyAPIView(GenericAPIView):
    serializer_class = InvitationCodeFamilySerializer
    
    def make_family_invitation_code(length=32):
        return base64.urlsafe_b64encode(
            codecs.encode(uuid.uuid4().bytes, "base64").rstrip()
        ).decode()[:32]
    
    def timer_delete(self):
        time = datetime.datetime.now()-datetime.timedelta(minutes=5)
        data = InvitationCodeFamily.objects.filter(created_at__lt=time)
        data.delete()
        threading.Timer(1, self.timer_delete).start()

    def get(self, request, family_id):
        self.timer_delete()
        if not request.user.family_id :
            return Response(f'{request.user.name}님은 가족에 가입되어 있지 않습니다.',status=status.HTTP_400_BAD_REQUEST)
        if request.user.family_id.id == family_id:
            serializer = self.serializer_class(data={
                "invitationcode" : self.make_family_invitation_code(),
                "family_id" : family_id,
            })
            if serializer.is_valid(raise_exception=True):
                serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response("본인이 속한 가족으로만 초대할 수 있습니다.", status=status.HTTP_400_BAD_REQUEST)


class InviteCodeSignFamilyAPIView(GenericAPIView):
    serializer_class = CodeFamilySerializer
    def post(self, request):
        invitationcode = request.data['invitationcode']
        invitationcode1 = get_object_or_404(InvitationCodeFamily, invitationcode=invitationcode)
        family_id = invitationcode1.family_id.id
        family = get_object_or_404(Family,id=family_id)
        
        if request.user.is_authenticated :
            if request.user.family_id :
                return Response(f'{request.user.name}님은 이미 가족에 가입되어 있습니다.',status=status.HTTP_400_BAD_REQUEST)
            else :
                family.users.add(request.user)
                serializer = FamilyUpdateSerializer(family)
                return Response(serializer.data, status=status.HTTP_200_OK)


class FamilySecessionAPIView(UpdateAPIView):
    serializer_class = FamilySecessionSerializer
    def put(self, request):
        user = get_object_or_404(User, id=request.user.id)
        serializer = self.serializer_class(instance=user, data={'family_id' : None})
        if request.user.family_id:
            family_id = request.user.family_id.id
            if serializer.is_valid(raise_exception=True):
                serializer.save()
            family_user = User.objects.filter(family_id=family_id).exists()
            if not family_user:
                family = get_object_or_404(Family, id=request.user.family_id.id)
                family.delete()
            return Response("family에서 탈퇴하였습니다.", status=status.HTTP_200_OK)
        return Response("family에 가입되어 있지 않습니다.", status=status.HTTP_403_FORBIDDEN)  