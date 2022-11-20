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


class GetImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ('image',)

class  ChecklistSerializer(serializers.ModelSerializer):
    photo = GetImageSerializer(read_only=True)
    from_user_id = serializers.SerializerMethodField()
    from_user_name = serializers.SerializerMethodField()
    family_name = serializers.SerializerMethodField()
    class Meta: 
        model = Checklist
        fields= ('id', 'text', 'status', 'created_at', 'from_user_id', 'from_user_name','family_name', 'photo')

    def get_family_name(self,obj) :

        return self.context['interaction_name']
    def get_from_user_id(self,obj) :

        return self.context['user_id']
    def get_from_user_name(self,obj) :

        return self.context['name']
    
class  MainChecklistSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Checklist
        fields= ('id', 'text', 'status',)



class ChecklistCreateSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Checklist
        fields= ('id', 'text', 'photo', 'from_user_id', 'to_users_id',)


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

