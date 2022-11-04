from django.db import models
from families.models import Family


class Schedule(models.Model) :
    id = models.BigAutoField(primary_key=True)
    start_date = models.DateField(null=True)
    end_date = models.DateField(null=True)
    title = models.CharField(max_length=30)
    color = models.CharField(max_length=50)
    important_mark = models.BooleanField(default=False)
    family = models.ForeignKey(Family, on_delete=models.CASCADE, related_name="calendar_family")

