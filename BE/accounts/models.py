from django.db import models
from django.contrib.auth.models import (
    AbstractUser
    )
from django.conf import settings
from django.utils.translation import ugettext_lazy as _
from django.core.validators import MinLengthValidator
from .manager import CustomUserManager
from families.models import Family
from django.core.exceptions import ValidationError

# Create your models here.
class User(AbstractUser) :

#------------사용하지 않을 기본 상속 필드 ------------------------------
    username = None
    first_name = None
    last_name = None
    last_login = None
    groups = None
    date_joined = None
    email = None

#-------------사용할 필드 ---------------------------------------
    id = models.BigAutoField(primary_key=True)
    phone = models.CharField(max_length=11, unique=True, validators=[MinLengthValidator(10)],verbose_name='휴대폰 번호' )
    name = models.CharField(max_length=30, validators=[MinLengthValidator(2)],verbose_name='이름')
    birth = models.DateField(verbose_name='생년월일')
    image = models.ImageField(upload_to='user/profile/',
                default='user/profile/profile_default1.png',
                null=True,blank=True,verbose_name='프로필 사진')
    family_id = models.ForeignKey(Family,related_name='users',on_delete=models.SET_NULL,null=True,blank=True)
    kakao_id = models.CharField(max_length = 30, unique=True,null=True,blank=True)
    # 로그인 아이디
    USERNAME_FIELD = 'phone'
    REQUIRED_FIELDS = ['name','birth']

    objects = CustomUserManager()

    def __str__(self) :
        return self.name