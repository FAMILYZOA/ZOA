from rest_framework import serializers
from checklist.models import Checklist, Photo


class  ChecklistStateChangeSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Checklist
        fields= ('status',)

        
class  ChecklistSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Checklist
        fields= ('id', 'text', 'status', 'created_at', 'to_users_id')


class ChecklistCreateSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Checklist
        fields= ('id', 'text', 'photo', 'from_user_id', 'to_users_id')


class  ChecklistDetailSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Checklist
        fields= '__all__'


class  ChecklistStateChangeSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Checklist
        fields= ('status',)


class ResultSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    text = serializers.CharField(max_length=20)
    from_user_id = serializers.IntegerField()
    to_users_id = serializers.IntegerField()
    class Meta: 
        model = Photo
        fields = ( 'id', 'image', 'text', 'from_user_id', 'to_users_id')
