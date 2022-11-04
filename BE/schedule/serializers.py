from .models import Schedule
from families.models import Family
from rest_framework import serializers


class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = ('id', 'title', 'color', 'start_date', 'end_date', 'family',)



class UpdateScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = ('id', 'title', 'color',)
