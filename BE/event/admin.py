from django.contrib import admin
from .models import Device


class DeviceAdmin(admin.ModelAdmin):
    list_display = ('id', 'user')


admin.site.register(Device, DeviceAdmin)