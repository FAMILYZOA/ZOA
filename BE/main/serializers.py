from rest_framework import serializers
from main.models import Checklist
from accounts.models import User


class  ChecklistSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Checklist
        fields= '__all__'


class  ChecklistDetailSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Checklist
        fields= '__all__'

