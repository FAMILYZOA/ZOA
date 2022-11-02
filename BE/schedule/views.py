from .models import Calendar
from accounts.models import User 
from families.models import Family 
from rest_framework import status, filters
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from . serializers import (
    CalendarCreateSerializer,
    )

class SearchCalendarAPIView(GenericAPIView):
    serializer_class = CalendarCreateSerializer
    filter_backends = [filters.SearchFilter,]
    search_fields = ['']
    def get(self, request):
        return Response("")


class CreateDetailCalendarAPIView(GenericAPIView):
    def get(self, request, date):
        return Response("")

    def post(self, request, *args, **kwargs):
        try:
            family = Family.objects.get(pk=request.user.family_id.id)
            serializer = CalendarCreateSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save(family=family)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except AttributeError:
            return Response("가족에 먼저 가입하세요.", status=status.HTTP_400_BAD_REQUEST)

class ModifyDeleteCalendarAPIView(GenericAPIView):
    def put(self, request, date, schedule_id):
        return Response("")

    def delete(self, request, date, schedule_id):
        return Response("")       