from django.contrib import admin
from .models import Comment, Scrum
# Register your models here.
class ScrumAdmin(admin.ModelAdmin) :
    list_display = ('id','emoji','user','family')
    readonly_fields = ('created_at',)
# Register your models here.
admin.site.register(Scrum,ScrumAdmin)
admin.site.register(Comment)

