from django.contrib import admin

from .models import Order, OrderMenu, Queue
# Register your models here.


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'supplier', 'customer', 'status', 'timestamp']
    ordering = ['-timestamp']
    list_filter = ['supplier']


@admin.register(OrderMenu)
class OrderMenuAdmin(admin.ModelAdmin):
    list_display = ['id','menu','order','amount']
    ordering = ['-id']
    search_fields = ['order__id']



@admin.register(Queue)
class QueueAdmin(admin.ModelAdmin):
    list_display = ['queue_number','status','order','timestamp']
    ordering = ['-timestamp']
    search_fields = ['order__id']