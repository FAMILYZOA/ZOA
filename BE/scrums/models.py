from tabnanny import verbose
from unittest.util import _MAX_LENGTH
from django.conf import settings
from django.db import models

from families.models import Family

# Create your models here.

class Scrum(models.Model) :

    id = models.BigAutoField(primary_key=True)
    emoji = models.CharField(max_length=7,verbose_name='오늘의 기분')
    yesterday = models.TextField(verbose_name='어제 나는',null=True,blank=True)
    today = models.TextField(verbose_name='오늘 나는',null=True,blank=True)
    created_at = models.DateField(auto_now_add=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,related_name='scrum')
    family = models.ForeignKey(Family,on_delete=models.CASCADE,related_name='scrum')
    def __str__(self) :
        return self.emoji    