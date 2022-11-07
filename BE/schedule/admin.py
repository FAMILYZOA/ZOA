from django.contrib import admin
from .models import Schedule

    
class ScheduleAdmin(admin.ModelAdmin):
    list_display = ('id', 'start_date', 'end_date', 'title', 'color', 'important_mark', 'get_writer', 'get_family')
    def get_writer(self,obj):
        return [writer.name for writer in obj.writer.all()]
    def get_family(self,obj):
        return [family.name for family in obj.family.all()]

admin.site.register(Schedule, ScheduleAdmin)