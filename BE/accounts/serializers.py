from accounts.models import User
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken, TokenError


# 회원가입
class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        max_length = 16,
        min_length = 8,
        # write_only :  password를 updating, creating 할 때는 사용되지만, serializing 할 때는 포함되지 않도록 하기 위해서
        write_only = True
    ),

    class Meta:
        model = User
        fields = [
            'id',
            'password',
            ''
            ]

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    # 중복 체크
    def validate(self, attrs):
        user_id = attrs['user_id']
        password = attrs['password']
        email = attrs['email']

        if User.objects.filter(user_id=user_id).exists():
            raise serializers.ValidationError("user_id already exists")

        elif User.objects.filter(email=email).exists():
            raise serializers.ValidationError("email already exists") 

        return attrs


# 로그인
class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
