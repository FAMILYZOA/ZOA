from rest_framework import serializers

from families.models import FamilyInteractionName
from .models import Scrum

class ScrumSerializer(serializers.ModelSerializer) :

    name = serializers.CharField(source='user.name',read_only=True)
    image = serializers.ImageField(source='user.image',read_only=True)
    set_name = serializers.SerializerMethodField()
    class Meta: 
        model = Scrum
        fields= ('emoji','yesterday','today','name','image','set_name')

    def get_set_name(self,obj) :
        from_user = self.context.get('request').user
        to_user = obj.user
        if to_user == from_user :
            return '나'
        
        if FamilyInteractionName.objects.filter(from_user=from_user,to_user=to_user).exists() :
            return FamilyInteractionName.objects.get(from_user=from_user,to_user=to_user).name
        else :
            return False