from django.db import models
from django.contrib.auth.models import (
    AbstractUser
    )
from django.conf import settings
from django.utils.translation import ugettext_lazy as _
from django.core.validators import MinLengthValidator
from .manager import CustomUserManager

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
    id = models.AutoField(primary_key=True)
    phone = models.CharField(max_length=11, unique=True, validators=[MinLengthValidator(11)])
    name = models.CharField(max_length=8, validators=[MinLengthValidator(2)])
    birth = models.CharField(max_length=8, validators=[MinLengthValidator(8)])
    image = models.ImageField(upload_to='user/profile/',
                default='user/profile/profile_default1.png',
                null=True,blank=True)
    
    # 로그인 아이디
    USERNAME_FIELD = 'phone'
    REQUIRED_FIELDS = ['name']

    objects = CustomUserManager()

    def __str__(self) :
        return self.name