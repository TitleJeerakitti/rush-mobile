from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import UserChangeForm

from .models import User

class MyUserChangeForm(UserChangeForm):
    class Meta(UserChangeForm.Meta):
        model = User

class MyUserAdmin(UserAdmin):
    form = MyUserChangeForm
    list_display = ['username','email','is_customer', 'is_supplier']
    fieldsets = UserAdmin.fieldsets + (
            ('TYPE', {'fields': ('is_customer','is_supplier')}),
    )


admin.site.register(User, MyUserAdmin)