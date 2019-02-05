from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.dispatch import receiver


# Create your models here.


class User(AbstractUser):
    is_customer = models.BooleanField('customer status', default=False)
    is_supplier = models.BooleanField('supplier status', default=False)



