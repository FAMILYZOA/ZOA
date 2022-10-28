from rest_framework.generics import ListCreateAPIView,ListAPIView,RetrieveUpdateDestroyAPIView
from scrums.models import Scrum
from rest_framework import status
from scrums.serializers import MainScrumSerializer, ScrumSerializer
from rest_framework.response import Response
from datetime import datetime
from rest_framework import filters
from drf_yasg.utils import swagger_auto_schema

# Create your views here.

class ScrumAPIView(ListCreateAPIView) :
    serializer_class = ScrumSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['created_at']

    @swagger_auto_schema(operation_summary="가족 스크럼 조회")
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    @swagger_auto_schema(operation_summary="가족 스크럼 작성")
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def list(self, request, *args, **kwargs):
        if request.GET.get('search') :
            queryset = self.filter_queryset(Scrum.objects.filter(family=self.request.user.family_id))
        else :
            queryset = Scrum.objects.filter(family=self.request.user.family_id,created_at=datetime.today().strftime("%Y-%m-%d")  )
        serializer = self.get_serializer(queryset, many=True)

        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        today = datetime.today().strftime("%Y-%m-%d")  
        if Scrum.objects.filter(created_at=today,user=self.request.user).exists() :
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

    @swagger_auto_schema(operation_summary="메인페이지 스크럼 조회")
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def list(self, request, *args, **kwargs):
        today = datetime.today().strftime("%Y-%m-%d")  
        queryset = Scrum.objects.filter(family=self.request.user.family_id,created_at=today)
        serializer = self.get_serializer(queryset, many=True)

        return Response(serializer.data)

class ScrumDetailUpdateAPIView(RetrieveUpdateDestroyAPIView) :

    serializer_class = ScrumSerializer
    queryset = Scrum.objects.all()
    lookup_field = 'id'
    
    @swagger_auto_schema(operation_summary="스크럼 상세 조회")
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        if request.user.family_id == instance.family :
            return Response(serializer.data)
        return Response({'조회 권한이 없습니다.'},status=status.HTTP_403_FORBIDDEN)

    @swagger_auto_schema(operation_summary="스크럼 수정 (작성자만)")
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

    @swagger_auto_schema(operation_summary="스크럼 삭제 (작성자만)")
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if request.user != instance.user :
            return Response({'삭제 권한이 없습니다.'},status=status.HTTP_403_FORBIDDEN)
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)