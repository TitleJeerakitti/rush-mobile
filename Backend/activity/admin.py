from django.contrib import admin

from .models import *
# Register your models here.
@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    pass


@admin.register(ViewActivity)
class ViewActivityAdmin(admin.ModelAdmin):
    pass