from django.contrib import admin
from .models import Checklist

    
class ChecklistAdmin(admin.ModelAdmin):
    list_display = ('id', 'text', 'status', 'from_user_id', 'to_users_id')
    readonly_fields = ('created_at',)

admin.site.register(Checklist, ChecklistAdmin)