from datetime import datetime
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from django.http import Http404
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView, ListAPIView
from rest_framework.parsers import MultiPartParser
from rest_framework.pagination import PageNumberPagination
from .models import Checklist
from accounts.models import User
from .serializers import ChecklistSerializer, ChecklistDetailSerializer, ChecklistStateChangeSerializer, ChecklistCreateSerializer


class ChecklistCreateAPIView(GenericAPIView):
    parser_classes = (MultiPartParser,)
    @swagger_auto_schema(request_body=ChecklistCreateSerializer)
    def post(self, request):
        result = []
        member = request.data.getlist('to_users_id')
        for memberpk in member:
            if request.data.get('photo') == None:
                context = {
                    'text': request.data.get('text'),
                    'from_user_id': request.user.id,
                    'to_users_id' :memberpk
                }
            else:
                context = {
                    'text': request.data.get('text'),
                    'photo': request.FILES['photo'],
                    'from_user_id': request.user.id,
                    'to_users_id' :memberpk
                }
            
            if not request.user.family_id:
                return Response("당신은 가족에 가입되어 있지 않습니다", status=status.HTTP_403_FORBIDDEN)
            giver = request.user.family_id.id
            for id in member:
                man = User.objects.get(id=id)
                family_num = man.family_id.id
                if giver != family_num:
                    context = {
                        f'{man}님은 당신이 속한 가족의 멤버가 아닙니다.'
                    }
                    return Response(context, status=status.HTTP_400_BAD_REQUEST)
            serializer = ChecklistCreateSerializer(data=context)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                result.append(serializer.data)
        return Response(result, status=status.HTTP_201_CREATED)


class ChecklistPagination(PageNumberPagination):
    page_size = 5


class ChecklistSearchAPIView(ListAPIView):
    queryset = Checklist.objects.all()
    serializer_class = ChecklistSerializer
    pagination_class = ChecklistPagination
    filter_backends=[ DjangoFilterBackend, ]
    filterset_fields = ['status']
    
    def get_queryset(self):
        id = self.request.parser_context['kwargs']['to_users_id']
        me = User.objects.get(id=id).family_id
        you = User.objects.get(id=self.request.user.id).family_id
        if me == you:
            return Checklist.objects.filter(to_users_id=id).order_by('created_at')
        raise Http404


class ChecklistTodayCreateAPIView(GenericAPIView):
    serializer_class = ChecklistSerializer
    def get(self, request, to_users_id):
        today = datetime.today()
        year, month, day = today.year, today.month, today.day
        checklist = Checklist.objects.filter(Q(to_users_id__exact=to_users_id) & Q(created_at__year=year, created_at__month=month, created_at__day=day))
        serializer = self.serializer_class(checklist, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK) 


class ChecklistDetailAPIView(GenericAPIView):
    serializer_class = ChecklistDetailSerializer
    def get(self, request, checklist_id):
        checklist = Checklist.objects.get(id=checklist_id)
        serializer = self.get_serializer(checklist)
        return Response(serializer.data, status=status.HTTP_200_OK) 


    @swagger_auto_schema(request_body=ChecklistStateChangeSerializer)
    def put(self, request, checklist_id):
        checklist = Checklist.objects.get(id=checklist_id)
        serializer = ChecklistStateChangeSerializer(checklist, data=request.data)
        if request.user.id == checklist.to_users_id.id:
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK) 
        return Response("Todo가 부여된 사용자가 아닙니다.", status=status.HTTP_403_FORBIDDEN)

    def delete(self, request, checklist_id):
        checklist = get_object_or_404(Checklist, id=checklist_id)
        if request.user.id == checklist.from_user_id.id:
            checklist.delete()
            return Response("해당 Todo를 삭제하였습니다.", status=status.HTTP_200_OK)     
        return Response("Todo 부여자가 아닙니다.", status=status.HTTP_403_FORBIDDEN)


