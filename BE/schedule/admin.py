from django.contrib import admin
from .models import Schedule

    
class ScheduleAdmin(admin.ModelAdmin):
    list_display = ('id', 'start_date', 'end_date', 'title', 'color', 'important_mark', 'writer', 'family')

admin.site.register(Schedule, ScheduleAdmin)