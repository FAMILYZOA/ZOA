from accounts.manager import password_creator
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

        if not phone.isdecimal() :
            raise serializers.ValidationError('휴대폰 번호는 숫자 형식이어야 합니다.')
        REGEX_PASSWORD = '^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()])[\w\d!@#$%^&*()]{8,12}$'
        if not re.fullmatch(REGEX_PASSWORD, password):
            raise serializers.ValidationError("비밀번호는 숫자, 대/소문자, 특수문자를 사용해야 합니다.",'regex')

        return attrs


class KaKaoSignupSerializer(serializers.ModelSerializer):
    image = serializers.CharField()
    kakao_id = serializers.CharField(required=True)
    class Meta:
        model = User
        fields = ('id','phone','name','birth','kakao_id','image')
        read_only_fields = ('id',)

    def create(self, validated_data):
        
        # if validated_data['kakao_id']

        instance = self.Meta.model(**validated_data)
        instance.set_password(password_creator())
        image = validated_data.pop('image',None)

        if image is not None :
            instance.image = image
        instance.save()
        return instance
    def validate(self, attrs):
        kakao_id = attrs['kakao_id']

        if User.objects.filter(kakao_id=kakao_id).exists():
            raise serializers.ValidationError('이미 가입된 kakao 회원입니다.')

        return attrs


# 로그인
class LoginSerializer(serializers.ModelSerializer):
    password = password_field
    class Meta:
        model = User
        fields = ('id','phone','password','kakao_id','family_id')
        read_only_fields=('kakao_id','family_id')

class KaKaoLoginSerializer(serializers.ModelSerializer) :
    kakao_id = serializers.CharField(required=True)
    class Meta :
        model = User 
        fields = ('kakao_id',)

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


# 회원정보 수정
class ProfileSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)
    class Meta:
        model = User
        fields = ('id','phone','name','birth','image','family_id')
        extra_kwargs = {"phone": {"required": False},"name" : {"required" : False}}
        read_only_fields = ('id','family_id','birth',)
    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for (key, value) in validated_data.items():
            setattr(instance, key, value)
        if password is not None:
            instance.set_password(password)
    
        image = validated_data.pop('image',None)

        if image is not None :
            instance.image = image

        instance.save()
        return instance


class ProfileRetriveSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ('id','phone','name','birth','image','family_id')
        extra_kwargs = {"phone": {"required": False},"name" : {"required" : False}}
        read_only_fields = ('id','family_id','birth',)

    def get_image(self,obj) :
        if 'kakao' in obj.image.url :
            res = obj.image.url.replace('https://zoa-bucket.s3.ap-northeast-2.amazonaws.com/http%3A/','http://')
            return res
        return obj.image.url

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

