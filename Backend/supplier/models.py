from django.db import models
from account.models import User
from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.


class Supplier(models.Model):
    RESTAURANT_CATEGORY = (
        ('FASTFOOD', 'อาหารจานด่วน'),
        ('BAKERY', 'เบเกอรี่'),
        ('CAFE', 'คาเฟ่'),
        ('STEAK', 'สเต็ก'),
        ('CHINESE', 'อาหารจีน'),
        ('KOREA', 'อาหารเกาหล่ี'),
        ('THAI', 'อาหารไทย'),
        ('INDIA', 'อาหารอินเดีย'),
        ('ITALY', 'อาหารอิตาลี่'),
        ('OTHER', 'อื่นๆ'),
    )
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True)
    name = models.CharField(max_length=30)
    profile_picture = models.ImageField(upload_to='supplier/profile')
    banner_picture = models.ImageField(upload_to='supplier/banner')
    address = models.CharField(blank=True, max_length=150)
    description = models.CharField(blank=True, max_length=300)
    isOpen = models.BooleanField('open status', default=False)
    category = models.CharField(
        max_length=8,
        choices=RESTAURANT_CATEGORY,
        default='OTHER',
    )

    def __str__(self):
        return self.name

        


class Telephone(models.Model):
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE)
    tel_number = PhoneNumberField(null=False, blank=False, unique=True)

    def __str__(self):
        return self.supplier.name


class ExtraPicture(models.Model):
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='supplier/extra')

    def __str__(self):
        return self.supplier.name


class MainCategory(models.Model):
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    description = models.CharField(blank=True, max_length=150)

    def __str__(self):
        return self.supplier.name+' '+self.name


class SubCategory(models.Model):
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE)
    main_category = models.ForeignKey(MainCategory, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    description = models.CharField(blank=True, max_length=150)

    def __str__(self):
        return self.supplier.name+' '+self.name


class Menu(models.Model):
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE)
    sub_category = models.ForeignKey(SubCategory, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    price = models.FloatField(null=True, blank=True, default=None)
    image = models.ImageField(upload_to='supplier/menu')

    def __str__(self):
        return self.supplier.name+' '+self.name
