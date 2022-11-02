from django.core.validators import FileExtensionValidator
from rest_framework import serializers
from .models import Audio

class AudioSerializer(serializers.ModelSerializer):

    audio = serializers.FileField(
        validators=[FileExtensionValidator(allowed_extensions=['m4a', 'mp3'])])

    class Meta:
        model = Audio
        read_only_fields = ('id','from_user_id',)
        fields = '__all__'