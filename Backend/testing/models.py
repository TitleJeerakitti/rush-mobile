from django.db import models
# Create your models here.


class Restaurant(models.Model):
    name = models.CharField(max_length=200)
    rating = models.FloatField(null=True, blank=True, default=None)
    reviewCount = models.IntegerField(default=0)
    category = models.CharField(max_length=200)
    isOpen = models.BooleanField(default=False)
    distance = models.FloatField(null=True, blank=True, default=None)
    image = models.ImageField(upload_to='testing')

    def __str__(self):
        return self.name
