from django.contrib import admin

from account.models import User
from .models import Customer

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ['user', 'birthday','tel_number']

