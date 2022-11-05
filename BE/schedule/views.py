from .models import Schedule
from accounts.models import User  
from accounts.permissions import IsFamilyorBadResponsePermission
from django.shortcuts import get_object_or_404
from django.db.models import Q
from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from drf_yasg.utils import swagger_auto_schema
from . serializers import (
    DdaySerializer,
    ScheduleSerializer,
    UpdateScheduleSerializer,
)


class SearchSDdayAPIView(GenericAPIView):
    permission_classes = [IsFamilyorBadResponsePermission]
    serializer_class = DdaySerializer
    def get (self, request, date):
        result = []
        schedules = Schedule.objects.filter(Q(start_date__gte=date)).order_by('start_date')[:3]
        for schedule in schedules:
            Dday = schedule.start_date - date
            context = {
                'title': schedule.title,
                'start_date': schedule.start_date,
                'end_date': schedule.end_date,
                'Dday': Dday.days,
            }
            result.append(context)
        serializer = self.serializer_class(result, many=True)
        return Response(serializer.data)


class SearchScheduleAPIView(GenericAPIView):
    permission_classes = [IsFamilyorBadResponsePermission]
    serializer_class = ScheduleSerializer
    def get(self, request, month):
        schedule = Schedule.objects.filter(
            Q(end_date__year__gte=month.year) &
            Q(end_date__month__gte=month.month) &
            Q(start_date__year__lte=month.year) &
            Q(start_date__month__lte=month.month) & 
            Q(family_id=request.user.family_id)
        ).order_by('start_date')
        serializer = ScheduleSerializer(schedule, many=True)
        if serializer.data:
            return Response(serializer.data, status=status.HTTP_302_FOUND)
        else:
            return Response("스케줄이 없습니다.", status=status.HTTP_404_NOT_FOUND)


class CreateSearchScheduleAPIView(GenericAPIView):
    permission_classes = [IsFamilyorBadResponsePermission]
    serializer_class = ScheduleSerializer
    @swagger_auto_schema(operation_summary="date 입력 양식: YYYY-MM-DD")
    def get(self, request, date):
        schedule = Schedule.objects.filter(
            Q(start_date__lte=date) & 
            Q(end_date__gte=date) & 
            Q(family_id=request.user.family_id)
        )
        serializer = ScheduleSerializer(schedule, many=True)
        if serializer.data:
            return Response(serializer.data, status=status.HTTP_302_FOUND)
        else:
            return Response("스케줄이 없습니다.", status=status.HTTP_404_NOT_FOUND)

    @swagger_auto_schema(operation_summary="date 입력 양식: YYYY-MM-DD, end_date 입력안하면 date값으로 입력됨", request_body=ScheduleSerializer)
    def post(self, request, date):
        try:
            user = User.objects.get(pk=request.user.id)
            if request.data.get('end_date') is None:
                context = {
                    'title': request.data.get('title'),
                    'color': request.data.get('color'),
                    'start_date': date,
                    'end_date': date,
                    'important_mark': request.data.get('important_mark'),
                    'writer': request.user.id,
                    'family': user.family_id.id,
                }
            else:
                context = {
                    'title': request.data.get('title'),
                    'color': request.data.get('color'),
                    'start_date': request.data.get('start_date'),
                    'end_date': request.data.get('end_date'),
                    'important_mark': request.data.get('important_mark'),
                    'writer': request.user.id,
                    'family': user.family_id.id,
                }

            serializer = self.serializer_class(data=context)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except AttributeError:
            return Response("잘못된 요청입니다.", status=status.HTTP_400_BAD_REQUEST)


class DetailModifyDeleteScheduleAPIView(GenericAPIView):
    permission_classes = [IsFamilyorBadResponsePermission]
    serializer_class = ScheduleSerializer
    update_serializer_class = UpdateScheduleSerializer

    def get(self, request, schedule_id):
        schedule = get_object_or_404(Schedule, id=schedule_id)
        if request.user.family_id.id == schedule.family_id:
            serializer = self.serializer_class(schedule)
            return Response(serializer.data, status=status.HTTP_200_OK) 
        return Response("당신이 가입한 가족의 일정만 확인 가능합니다.", status=status.HTTP_400_BAD_REQUEST) 

    @swagger_auto_schema(request_body=UpdateScheduleSerializer)
    def put(self, request, schedule_id):
        schedule = get_object_or_404(Schedule, id=schedule_id)
        serializer = self.update_serializer_class(instance=schedule, data=request.data, partial=True)
        if request.user.family_id.id == schedule.family_id:
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
        return Response("권한이 없습니다.", status=status.HTTP_403_FORBIDDEN) 

    def delete(self, request, schedule_id):
        schedule = get_object_or_404(Schedule, id=schedule_id)
        if request.user.family_id.id == schedule.family_id:
            schedule.delete()
            return Response("해당 스케줄을 삭제하였습니다.", status=status.HTTP_204_NO_CONTENT)     
        return Response("권한이 없습니다.", status=status.HTTP_403_FORBIDDEN)    