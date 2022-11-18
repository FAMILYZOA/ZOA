from tabnanny import verbose
from unittest.util import _MAX_LENGTH
from django.conf import settings
from django.db import models

from families.models import Family

# Create your models here.

class Scrum(models.Model) :

    id = models.BigAutoField(primary_key=True)
    emoji = models.CharField(max_length=50,verbose_name='오늘의 기분')
    yesterday = models.CharField(max_length=25,verbose_name='어제 나는',null=True,blank=True)
    today = models.CharField(max_length=25,verbose_name='오늘 나는',null=True,blank=True)
    created_at = models.DateField(auto_now_add=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,related_name='scrum')
    family = models.ForeignKey(Family,on_delete=models.CASCADE,related_name='scrum')
    def __str__(self) :
        return self.emoji    

class Comment(models.Model) :
    id = models.BigAutoField(primary_key=True)
    content = models.CharField(max_length=50)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,related_name='comment')
    scrum = models.ForeignKey(Scrum,on_delete=models.CASCADE,related_name='comment')
    family = models.ForeignKey(Family,on_delete=models.CASCADE,related_name='comment')
    created_at = models.DateTimeField(auto_now_add=True)