from accounts.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
import re


# 회원가입
class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=16,min_length=6,write_only=True)

    class Meta:
        model = User
        fields = ('id','phone', 'password', 'name','birth',)
        read_only_fields = ('id','image')

    def create(self, validated_data):
        """
        # Response의 비밀번호가 암호화되지 않게 하려면 이렇게 하면 된다.
        # 단, 보안상 암호화하는 것을 권장한다.

        instance = self.Meta.model(**validated_data)
        instance.save()
        return instance
        """
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    def validate(self, attrs):
        phone = attrs['phone']
        password = attrs['password']

        if User.objects.filter(phone=phone).exists():
            raise serializers.ValidationError("핸드폰 번호가 존재합니다.")
        if not 8 <= len(password) <= 12:
            raise serializers.ValidationError("비밀번호는 8 ~ 12자리여야 합니다.")

        REGEX_PASSWORD = '^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()])[\w\d!@#$%^&*()]{8,12}$'
        if not re.fullmatch(REGEX_PASSWORD, password):
            raise serializers.ValidationError("비밀번호는 숫자, 대/소문자, 특수문자를 사용해야 합니다.")

        return attrs


# 로그인
class LoginSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=16,min_length=6,write_only=True)
    class Meta:
        model = User
        fields = ('id','phone','password')


# 로그아웃
class RefreshTokenSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    default_error_messages = {
        'bad_token': 'Token is invalid or expired'
    }
    def validate(self, attrs):
        self.token = attrs['refresh']
        return attrs
    def save(self, **kwargs):
        try:
            RefreshToken(self.token).blacklist()
        except TokenError:
            self.fail('bad_token')


# 회원정보 조회/수정
class ProfileSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        max_length=16,
        min_length=8,
        write_only=True
    )
    class Meta:
        model = User
        fields = "__all__"
        read_only_fields = ('token', )
    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for (key, value) in validated_data.items():
            setattr(instance, key, value)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


# 비밀번호 변경
class ChangePasswordSerializer(serializers.ModelSerializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
    class Meta:
        model = User
        fields = ('old_password', 'new_password')
        extra_kwargs = {'new_password': {'write_only': True, 'required': True},
                        'old_password': {'write_only': True, 'required': True}}

    def validate_new_password(self, value):
        validate_password(value)
        return value