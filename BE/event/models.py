from django.db import models
from pytz import timezone
from django.conf import settings  

# Create your models here.
class PhoneAuthentication(models.Model):
    phone = models.CharField('휴대폰 번호', max_length=11)
    certification = models.CharField('인증번호', max_length=6)
    created_at = models.DateTimeField(auto_now=True)
    
