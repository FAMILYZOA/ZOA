from django.db import models
from accounts.models import User

class Audio(models.Model) :
    id = models.BigAutoField(primary_key=True)
    audio = models.FileField(upload_to='audio/')
    created_at = models.DateField(auto_now_add=True)
    status = models.BooleanField(default=False)
    second = models.IntegerField()
    from_user_id = models.ForeignKey(User, related_name='audios_from', on_delete=models.CASCADE, db_column='from_user_id')
    to_user_id = models.ManyToManyField(User, related_name='audios_to', db_column='to_user_id')