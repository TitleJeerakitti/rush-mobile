from django.contrib import admin

from .models import *
# Register your models here.


@admin.register(Supplier)
class SupplierAdmin(admin.ModelAdmin):
    list_display = ['name', 'latitude', 'longitude','is_open','timestamp']
    ordering = ['timestamp', 'name'] 
    list_filter = ['is_open']
    
@admin.register(Telephone)
class TelephoneAdmin(admin.ModelAdmin):
    pass


@admin.register(ExtraPicture)
class ExtrapictureAdmin(admin.ModelAdmin):
    pass


@admin.register(MainCategory)
class MainCategoryAdmin(admin.ModelAdmin):
    pass


@admin.register(SubCategory)
class SubCategoryAdmin(admin.ModelAdmin):
    pass


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    pass


@admin.register(Menu)
class MenuAdmin(admin.ModelAdmin):
    pass

@admin.register(SupplierQueueIndex)
class SupplierQueueIndexAdmin(admin.ModelAdmin):
    pass

@admin.register(SupplierRegisterForm)
class SupplierRegisterFormAdmin(admin.ModelAdmin):
    pass