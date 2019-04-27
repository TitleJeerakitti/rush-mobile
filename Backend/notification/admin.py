from django.contrib import admin
from notification.models import *
# Register your models here.

@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ['user', 'expo_token','timestamp']
    ordering = ['-timestamp']
    search_fields = ['user']


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ['notification','message','title','timestamp']
    ordering = ['-timestamp']
    search_fields = ['user']

