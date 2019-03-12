from django.contrib import admin
from .models import *

@admin.register(Promotion)
class PromotionAdmin(admin.ModelAdmin):
    pass

@admin.register(PromotionUsage)
class PromotionUsageAdmin(admin.ModelAdmin):
    pass