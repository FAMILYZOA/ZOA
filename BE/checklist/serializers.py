from rest_framework import serializers
from accounts.models import User
from checklist.models import Checklist, Photo
from families.models import FamilyInteractionName


class  ChecklistStateChangeSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Checklist
        fields= ('status',)


class GetUserNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'name',)


class  ChecklistSerializer(serializers.ModelSerializer):
    to_users_id = GetUserNameSerializer(read_only=True)
    family_name = serializers.SerializerMethodField()
    class Meta: 
        model = Checklist
        fields= ('id', 'text', 'status', 'created_at', 'to_users_id', 'family_name')

    def get_family_name(self,obj) :
        from_user = obj.from_user_id
        to_user = obj.to_users_id
        
        if FamilyInteractionName.objects.filter(from_user=from_user,to_user=to_user).exists() :
            return FamilyInteractionName.objects.get(from_user=from_user,to_user=to_user).name
        else :
            return "본인입니다."


class ChecklistCreateSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Checklist
        fields= ('id', 'text', 'photo', 'from_user_id', 'to_users_id' , 'family',)


class  ChecklistDetailSerializer(serializers.ModelSerializer):
    family_name = serializers.SerializerMethodField()
    to_users_id = GetUserNameSerializer(read_only=True)
    class Meta: 
        model = Checklist
        fields= '__all__'

    def get_family_name(self,obj) :
        from_user = obj.from_user_id
        to_user = obj.to_users_id
        
        if FamilyInteractionName.objects.filter(from_user=from_user,to_user=to_user).exists() :
            return FamilyInteractionName.objects.get(from_user=from_user,to_user=to_user).name
        else :
            return "본인입니다."


class  ChecklistStateChangeSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Checklist
        fields= ('status',)