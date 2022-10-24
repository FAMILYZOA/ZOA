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
            'phone',
            'password',
            'name',
            'birth',
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
        phone = attrs['phone']

        if User.objects.filter(phone=phone).exists():
            raise serializers.ValidationError("핸드폰 번호가 존재합니다.")

        return attrs


# 로그인
class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
