from rest_framework import serializers

from families.models import FamilyInteractionName
from .models import Scrum

class ScrumSerializer(serializers.ModelSerializer) :

    user_id = serializers.IntegerField(source='user.id',read_only=True)
    name = serializers.CharField(source='user.name',read_only=True)
    image = serializers.ImageField(source='user.image',read_only=True)
    set_name = serializers.SerializerMethodField()
    class Meta: 
        model = Scrum
        fields= ('id','user_id','emoji','yesterday','today','name','image','set_name')

    def get_set_name(self,obj) :
        from_user = self.context.get('request').user
        to_user = obj.user
        if to_user == from_user :
            return '나'
        
        if FamilyInteractionName.objects.filter(from_user=from_user,to_user=to_user).exists() :
            return FamilyInteractionName.objects.get(from_user=from_user,to_user=to_user).name
        else :
            return False
            
class MainScrumSerializer(ScrumSerializer) :
    class Meta :
        model = Scrum
        fields= ('id','user_id','emoji','today','name','image','set_name')
