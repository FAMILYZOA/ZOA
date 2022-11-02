from django.core.validators import FileExtensionValidator
from rest_framework import serializers

from accounts.models import User
from families.models import FamilyInteractionName
from .models import Audio

class AudioSerializer(serializers.ModelSerializer):

    audio = serializers.FileField(
        validators=[FileExtensionValidator(allowed_extensions=['m4a', 'mp3'])])

    class Meta:
        model = Audio
        read_only_fields = ('id','from_user_id','status')
        fields = '__all__'

class AudioListSerializer(serializers.ModelSerializer) :
    image = serializers.CharField(source='from_user_id.image',read_only=True)
    set_name = serializers.SerializerMethodField()
    class Meta :
        model = Audio
        fields = ('id','image','set_name','audio','created_at')

    def get_set_name(self,obj) :
        from_user = obj.from_user_id
        to_user = self.context.get('request').user
        
        if FamilyInteractionName.objects.filter(from_user=from_user,to_user=to_user).exists() :
            return FamilyInteractionName.objects.get(from_user=from_user,to_user=to_user).name
        else :
            return False

class AudioDetailSerializer(serializers.ModelSerializer) :
    name = serializers.CharField(source='from_user_id.name',read_only=True)
    set_name = serializers.SerializerMethodField()
    class Meta :
        model = Audio
        fields = ('id','name','set_name','audio','created_at')

    def get_set_name(self,obj) :
        from_user = obj.from_user_id
        to_user = self.context.get('request').user
        
        if FamilyInteractionName.objects.filter(from_user=from_user,to_user=to_user).exists() :
            return FamilyInteractionName.objects.get(from_user=from_user,to_user=to_user).name
        else :
            return False