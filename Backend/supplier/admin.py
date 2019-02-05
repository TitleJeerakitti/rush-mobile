from django.contrib import admin

from .models import *
# Register your models here.
@admin.register(Supplier)
class SupplierAdmin(admin.ModelAdmin):
    pass

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

@admin.register(Menu)
class MenuAdmin(admin.ModelAdmin):
    pass