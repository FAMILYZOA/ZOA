from .models import Calendar
from accounts.models import Family
from rest_framework import serializers


class FamilySerializer(serializers.ModelSerializer):
    class Meta:
        model = Family
        fields = ('id',)


class CalendarCreateSerializer(serializers.ModelSerializer):
    family = FamilySerializer(read_only=True)
    class Meta:
        model = Calendar
        fields = ('id', 'title', 'today', 'color', 'start_date', 'end_date', 'family',)
