from django.db import models

from phonenumber_field.modelfields import PhoneNumberField

from account.models import User


# Create your models here.
class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    birthday = models.DateField(null=True, auto_now=False)
    tel_number = PhoneNumberField(null=False, blank=False, unique=True)
    profile_picture = models.ImageField(upload_to='account/customer/profile',default='account/customer/profile/default_user.png')

    def __str__(self):
        return self.user.username

    def get_name(self):
        return self.user.first_name+' '+self.user.last_name
