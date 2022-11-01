from django.db import models

class Checklist(models.Model) :
    id = models.BigAutoField(primary_key=True)
    today = models.DateField()
    start_date = models.DateField()
    end_date = models.DateField()
    title = models.CharField(max_length=30)
    color = models.CharField(max_length=50)
    exitbtn = models.BooleanField(default=False)