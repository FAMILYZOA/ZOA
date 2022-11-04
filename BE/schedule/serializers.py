from .models import Schedule
from families.models import Family
from rest_framework import serializers


class DdaySerializer(serializers.Serializer):
    Dday = serializers.IntegerField()
    title = serializers.CharField(max_length=30)
    start_date = serializers.DateField()
    end_date = serializers.DateField()

    class Meta:
        model = Schedule
        fields = ('id', 'Dday', 'title', 'start_date', 'end_date')


class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = ('id', 'title', 'color', 'important_mark', 'start_date', 'end_date', 'family',)


class UpdateScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = ('id', 'title', 'color', 'important_mark',)
