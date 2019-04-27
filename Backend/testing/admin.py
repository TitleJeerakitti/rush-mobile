from django.contrib import admin
from .models import Restaurant, Testing

# Register your models here.

@admin.register(Restaurant)
class RestaurantAdmin(admin.ModelAdmin):
    pass

@admin.register(Testing)
class TetingAdmin(admin.ModelAdmin):
    pass