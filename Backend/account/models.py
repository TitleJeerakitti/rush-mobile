from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class User(AbstractUser):
    is_customer = models.BooleanField('customer status', default=False)
    is_supplier = models.BooleanField('supplier status', default=False)
    is_banned = models.BooleanField('banned status', default=False)
    
    def get_customer(self):
        from customer.models import Customer
        return Customer.objects.get(user=self)
            
    def get_supplier(self):
        from supplier.models import Supplier
        return Supplier.objects.get(user=self)
