from django.db import models

from phonenumber_field.modelfields import PhoneNumberField
from rest_framework import status

from account.models import User

# Create your models here.
class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    birthday = models.DateField(null=True, auto_now=False)
    tel_number = PhoneNumberField(null=False, blank=False)
    profile_picture = models.ImageField(upload_to='account/customer/profile',default='default/default_user.png')


    def __str__(self):
        return self.user.username


    def get_name(self):
        return self.user.first_name+' '+self.user.last_name


    def edit_profile(self,first_name,last_name,tel_number):
        self.user.first_name = first_name
        self.user.last_name = last_name
        self.tel_number = tel_number
        self.user.save(update_fields=['first_name','last_name'])
        self.save(update_fields=['tel_number'])
        return self


    def uploadphoto(self,profile_picture):
        import base64
        import datetime
        from django.core.files.base import ContentFile
        image_data = profile_picture
        format, imgstr = image_data.split(';base64,')

        ext = format.split('/')[-1]

        data = ContentFile(base64.b64decode(imgstr))
        file_name = self.user.first_name + \
            str(datetime.datetime.now())+'.' + ext
        self.profile_picture.save(file_name, data, save=True)
        return self

    def create_review(self,supplier,rate,comment):
        #check can review
        from order.models import Order
        from review.models import Review
        order = Order.objects.filter(customer=self,supplier=supplier,status=5)
        if order:
            review = Review.objects.create(customer=self,supplier=supplier,rate=rate,comment=comment)
            return {'status':200} #create done
        else:
            return {'status':601} #customer didn't order food
     