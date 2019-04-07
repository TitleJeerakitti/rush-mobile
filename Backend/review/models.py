from django.db import models

from customer.models import Customer
from supplier.models import Supplier
from order.models import Order
# Create your models here.


class Review(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE)
    rate = models.FloatField(null=True,default=None)
    comment = models.CharField(max_length=200)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.customer.user.email+' review '+self.supplier.name

    def get_timestamp(self):
        return self.timestamp.strftime("%H:%M %d-%B-%Y")

    
