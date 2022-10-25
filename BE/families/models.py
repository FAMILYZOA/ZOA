from django.db import models

# Create your models here.

class Family(models.Model) :

    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=13,verbose_name='가족이름')
    created_at = models.DateField(auto_now_add=True)

    def __str__(self) :
        return self.name
