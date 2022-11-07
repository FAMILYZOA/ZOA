from django.contrib import admin
from .models import Checklist

    
class ChecklistAdmin(admin.ModelAdmin):
    list_display = ('id', 'text', 'status', 'from_user_id', 'get_user')
    readonly_fields = ('created_at',)
    def get_user(self,obj):
        return [to_users_id.name for to_users_id in obj.to_users_id.all()]

admin.site.register(Checklist, ChecklistAdmin)