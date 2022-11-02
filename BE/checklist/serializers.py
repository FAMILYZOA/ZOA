from rest_framework import serializers
from checklist.models import Checklist, Photo


class PhotoSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Photo
        fields = ('image')


class  ChecklistSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Checklist
        fields= ('id', 'text', 'status', 'photochecklist', 'created_at', 'to_users_id')


class ChecklistCreateSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Checklist
        fields= ('id','text', 'photo', 'from_user_id', 'to_users_id')


class  ChecklistDetailSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Checklist
        fields= '__all__'


class  ChecklistStateChangeSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Checklist
        fields= ('status',)


class ResultSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Checklist
        fields= ('text', 'image', 'photo', 'from_user_id', 'to_users_id')