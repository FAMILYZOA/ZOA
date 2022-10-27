from accounts.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
import re


password_field = serializers.CharField(max_length=12,min_length=8,write_only=True,required=True)

# 회원가입
class SignupSerializer(serializers.ModelSerializer):
    password = password_field

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
            raise serializers.ValidationError("이미 존재하는 휴대폰 번호 입니다.")

        if not phone.isdecimal() :
            raise serializers.ValidationError('휴대폰 번호는 숫자 형식이어야 합니다.')
        REGEX_PASSWORD = '^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()])[\w\d!@#$%^&*()]{8,12}$'
        if not re.fullmatch(REGEX_PASSWORD, password):
            raise serializers.ValidationError("비밀번호는 숫자, 대/소문자, 특수문자를 사용해야 합니다.",'regex')

        return attrs


# 로그인
class LoginSerializer(serializers.ModelSerializer):
    password = password_field
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

    class Meta:
        model = User
        fields = ('phone','name','image')
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
    password = serializers.CharField(max_length=12,min_length=8,write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(max_length=12,min_length=8,write_only=True,required=True)
    old_password = serializers.CharField(max_length=12,min_length=8,write_only=True,required=True)

    class Meta:
        model = User
        fields = ('old_password', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "패스워드 필드들이 일치하지 않습니다."})

        return attrs

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError({"old_password": "이전 비밀번호가 일치하지 않습니다."})
        return value

    def update(self, instance, validated_data):

        instance.set_password(validated_data['password'])
        instance.save()

        return instance

class UserSerializer(serializers.ModelSerializer) :

    class Meta: 
        model = User 
        fields = ('id','name','image',)