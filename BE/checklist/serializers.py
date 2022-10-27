from rest_framework import serializers
from checklist.models import Checklist


class  ChecklistSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Checklist
        fields= ('id', 'text', 'status', 'to_user_id',)


class  ChecklistDetailSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Checklist
        fields= '__all__'


class  ChecklistStateChangeSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Checklist
        fields= ('status',)