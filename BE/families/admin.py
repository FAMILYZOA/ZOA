from django.contrib import admin

# Register your models here.
from .models import Family, FamilyInteractionName
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
class FamilyNameAdmin(admin.ModelAdmin) :
    list_display = ('to_user','from_user','name')
# Register your models here.
admin.site.register(Family,FamilyAdmin)
admin.site.register(FamilyInteractionName,FamilyNameAdmin)