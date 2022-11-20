from django.shortcuts import get_object_or_404
from rest_framework.generics import ListCreateAPIView,ListAPIView,RetrieveUpdateDestroyAPIView,CreateAPIView,GenericAPIView
from accounts.models import User
from accounts.permissions import IsFamilyorBadResponsePermission,IsObjectAuthororBadResponsePermission
from scrums.models import Scrum,Comment
from rest_framework import status
from scrums.serializers import CommentSerializer, MainScrumSerializer, ScrumDetailSerializer, ScrumSerializer
from rest_framework.response import Response
from datetime import datetime
from rest_framework import filters
from drf_yasg.utils import swagger_auto_schema
from rest_framework import mixins
from django.db.models import Q

# Create your views here.

class ScrumAPIView(ListCreateAPIView) :
    serializer_class = ScrumSerializer
    filter_backends = [filters.SearchFilter,]
    search_fields = ['created_at']
    permission_classes = [IsFamilyorBadResponsePermission]

    def get_queryset(self):
        return Scrum.objects.select_related('user').filter(family=self.family)

    @swagger_auto_schema(operation_summary="가족 스크럼 조회")
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def list(self, request, *args, **kwargs):
        self.family = self.request.user.family_id
        if request.GET.get('search') :
            queryset = self.filter_queryset(self.get_queryset())
        else :
            #쿼리 호출 
            queryset = Scrum.objects.select_related('user').filter(family=self.family,created_at=datetime.today().strftime("%Y-%m-%d"))
        serializer = self.get_serializer(queryset, many=True)

        return Response(serializer.data)

    @swagger_auto_schema(operation_summary="가족 스크럼 작성")
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        today = datetime.today().strftime("%Y-%m-%d")
        if Scrum.objects.filter(Q(created_at=today) & Q(user=self.request.user)).exists() :
            return Response({"스크럼은 하루에 한 개만 작성 가능합니다."},status=status.HTTP_400_BAD_REQUEST)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user,family=self.request.user.family_id)

class MainScrumAPIView(ListAPIView) :
    serializer_class = MainScrumSerializer

    def get_queryset(self):
        today = datetime.today().strftime("%Y-%m-%d")  
        return Scrum.objects.filter(created_at=today,family=self.request.user.family_id)
    
    @swagger_auto_schema(operation_summary="메인페이지 스크럼 조회")
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

from drf_yasg import openapi
created_param = openapi.Parameter('created_at', openapi.IN_QUERY, description="조회할 날짜를 입력해주세요", type=openapi.TYPE_STRING,required=True)

class ScrumDetailUpdateAPIView(RetrieveUpdateDestroyAPIView) :

    serializer_class = ScrumDetailSerializer
    queryset = Scrum.objects.all()
    lookup_field = 'id'
    

    @swagger_auto_schema(operation_summary="스크럼 상세 조회",manual_parameters=[created_param],operation_description='id는 조회할 user id를 입력해주세요')
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)
    def retrieve(self, request,id, *args, **kwargs):
        try:
            user = get_object_or_404(User,id=id)
            instance = Scrum.objects.get(created_at=request.GET['created_at'],user=user)
            serializer = self.get_serializer(instance)
            if request.user.family_id == instance.family :
                return Response(serializer.data)
            return Response({'조회 권한이 없습니다.'},status=status.HTTP_403_FORBIDDEN)
        except :
            return Response({'해당 날짜에 작성된 스크럼이 없습니다.'},status=status.HTTP_204_NO_CONTENT)

    @swagger_auto_schema(operation_summary="스크럼 수정 (작성자만)",operation_description='id는 수정할 scrum id를 입력해주세요')
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):

        instance = self.get_object()
        if request.user != instance.user :
            return Response({'수정 권한이 없습니다.'},status=status.HTTP_403_FORBIDDEN)
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)

    @swagger_auto_schema(operation_summary="스크럼 삭제 (작성자만)",operation_description='id는 삭제할 scrum id를 입력해주세요')
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if request.user != instance.user :
            return Response({'삭제 권한이 없습니다.'},status=status.HTTP_403_FORBIDDEN)
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

class CommentCreateAPIView(CreateAPIView) :

    queryset = Scrum.objects.all()
    lookup_field = 'id'
    serializer_class = CommentSerializer
    permission_classes = [IsFamilyorBadResponsePermission]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user,family=self.request.user.family_id,scrum = self.get_object())

class CommentUpdateDeleteAPIView(mixins.UpdateModelMixin,
                                   mixins.DestroyModelMixin,
                                   GenericAPIView):

    queryset = Comment.objects.all()
    lookup_field = 'id'
    serializer_class = CommentSerializer
    permission_classes = [IsObjectAuthororBadResponsePermission]

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
    