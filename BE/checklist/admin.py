from django.contrib import admin

from .models import Checklist
from accounts.models import User


    
class ChecklistAdmin(admin.ModelAdmin):
    list_display = ('id', 'text', 'status', 'from_user_id', 'get_user')

    def get_user(self,obj):
        return [to_users_id.name for to_users_id in obj.to_users_id.all()]

admin.site.register(Checklist, ChecklistAdmin)