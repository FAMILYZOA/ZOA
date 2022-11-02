from django.db import models
from families.models import Family
from accounts.models import User


class Calendar(models.Model) :
    id = models.BigAutoField(primary_key=True)
    today = models.DateField()
    start_date = models.DateField(null=True)
    end_date = models.DateField(null=True)
    title = models.CharField(max_length=30)
    color = models.CharField(max_length=50)
    family = models.ForeignKey(Family, on_delete=models.CASCADE, related_name="calendar_family")