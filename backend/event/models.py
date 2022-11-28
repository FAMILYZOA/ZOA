from django.db import models
from django.conf import settings  

# Create your models here.
class PhoneAuthentication(models.Model):
    phone = models.CharField('휴대폰 번호', max_length=11)
    certification = models.CharField('인증번호', max_length=6)
    created_at = models.DateTimeField(auto_now=True)
    
class Device(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, verbose_name="유저", null=True)
    fcmToken = models.CharField("FCM Token", blank=True, max_length=500, null=True)
    active = models.BooleanField(default=False)