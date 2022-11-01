from django.core.validators import FileExtensionValidator
from rest_framework import serializers
from .models import Audio
from django.db import models
from django.core.validators import int_list_validator

class IntegerListField(serializers.ListField) :
    child = serializers.IntegerField()

class AudioSerializer(serializers.ModelSerializer):
    to_user_id = IntegerListField(write_only=True)
    audio = serializers.FileField(
        validators=[FileExtensionValidator(allowed_extensions=['m4a', 'mp3'])])

    class Meta:
        model = Audio
        read_only_fields = ('id','from_user_id',)
        fields = '__all__'