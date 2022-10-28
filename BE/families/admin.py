from django.contrib import admin

# Register your models here.
from .models import Family
from accounts.models import User

# Register your models here.
class UserInline(admin.TabularInline) :
    model = User
    fields = ('name',)
    
class FamilyAdmin(admin.ModelAdmin):
    list_display = ('id', 'name',)
    inlines=[
        UserInline,
    ]

# Register your models here.
admin.site.register(Family,FamilyAdmin)