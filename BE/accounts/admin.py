from django.contrib import admin

# Register your models here.
from accounts.models import User

# Register your models here.

class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'name',)

# Register your models here.
admin.site.register(User,UserAdmin)