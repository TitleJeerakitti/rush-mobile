from django.contrib import admin
from .models import *
# Register your models here.
@admin.register(ReportDayMenu)
class ReportDayMenuAdmin(admin.ModelAdmin):
    pass

@admin.register(ReportDayTotal)
class ReportDayTotalAdmin(admin.ModelAdmin):
    pass