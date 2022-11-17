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
    name = serializers.CharField(source='from_user_id.name',read_only=True)
    image = serializers.SerializerMethodField()
    set_name = serializers.SerializerMethodField()
    class Meta :
        model = Audio
        fields = ('id','image','name','set_name','status','audio','created_at', 'second')

    def get_set_name(self,obj) :
        to_user = obj.from_user_id
        from_user = self.context.get('request').user
        
        if FamilyInteractionName.objects.filter(from_user=from_user,to_user=to_user).exists() :
            return FamilyInteractionName.objects.get(from_user=from_user,to_user=to_user).name
        else :
            return False
    def get_image(self,obj) :
        from_user = obj.from_user_id 
        if 'kakao' in from_user.image.url :
            res = from_user.image.url.replace('https://zoa-bucket.s3.ap-northeast-2.amazonaws.com/http%3A/','https://')
            return res
        return from_user.image.url

class AudioUpdateSerializer(serializers.ModelSerializer) :

    class Meta :
        model = Audio
        fields = ('id','status')