from django.contrib import admin

from .models import *
# Register your models here.


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ['action', 'user', 'timestamp']
    ordering = ['-timestamp']
    list_filter = ['action']

