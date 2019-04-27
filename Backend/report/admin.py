from django.contrib import admin
from .models import *
# Register your models here.
@admin.register(ReportDayMenu)
class ReportDayMenuAdmin(admin.ModelAdmin):
    list_display = ['timestamp','menu','amount','supplier']
    ordering = ['-timestamp']
    list_filter = ['supplier']

@admin.register(ReportDayTotal)
class ReportDayTotalAdmin(admin.ModelAdmin):
    list_display = ['timestamp','total','supplier']
    ordering = ['-timestamp']
    list_filter = ['supplier']