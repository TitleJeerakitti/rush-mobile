from django.db import models
# Create your models here.
import datetime

class Restaurant(models.Model):
    name = models.CharField(max_length=200)
    rating = models.FloatField(null=True, blank=True, default=None)
    reviewCount = models.IntegerField(default=0)
    category = models.CharField(max_length=200)
    is_open = models.BooleanField(default=False)
    image = models.ImageField(upload_to='testing',default='default/no_picture.png')

    def __str__(self):
        return self.name

class Testing(models.Model):
    date_time = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

    def get_date_time(self):
        return self.date_time.strftime("%H:%M %d-%B-%Y")