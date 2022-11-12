from django.db import models
from django.conf import settings
from datetime import timedelta
from django.db.models.functions import Now

# Create your models here.

class Family(models.Model) :

    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=13,verbose_name='가족이름')
    created_at = models.DateField(auto_now_add=True)

    def __str__(self) :
        return self.name

class FamilyInteractionName(models.Model) :
    family = models.ForeignKey(Family,on_delete=models.CASCADE,related_name='users_name')
    to_user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,related_name='to_family_name',)
    from_user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,related_name='from_family_name',)
    name = models.CharField(max_length=12)


class InvitationCodeFamily(models.Model): 
    family_id = models.ForeignKey(Family,on_delete=models.CASCADE,related_name='invitationcode',db_column='family_id')
    invitationcode = models.CharField(max_length=33)
    create_at = models.DateTimeField(auto_now_add=True)