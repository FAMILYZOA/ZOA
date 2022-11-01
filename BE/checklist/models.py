from django.db import models
from accounts.models import User

class Checklist(models.Model) :
    id = models.BigAutoField(primary_key=True)
    text = models.CharField(max_length=20,verbose_name='체크리스트 내용')
    status = models.BooleanField(default=False, verbose_name='완료 여부')
    photo = models.ImageField(upload_to='checklist/photo/',
                null=True, blank=True, verbose_name='체크리스트 사진')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    from_user_id = models.ForeignKey(User, related_name='fromUser', on_delete=models.CASCADE, db_column='from_user_id')
    to_users_id = models.ManyToManyField(User, related_name='checklists', db_column='to_user_id')


