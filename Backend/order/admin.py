from django.contrib import admin

from .models import Order,OrderMenu,Queue
# Register your models here.
@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    pass

@admin.register(OrderMenu)
class OrderMenuAdmin(admin.ModelAdmin):
    pass

@admin.register(Queue)
class QueueAdmin(admin.ModelAdmin):
    pass



