# Generated by Django 2.1.2 on 2019-05-07 21:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('supplier', '0012_supplier_timestamp'),
    ]

    operations = [
        migrations.CreateModel(
            name='SupplierRegisterForm',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('email', models.EmailField(max_length=254)),
                ('picture', models.ImageField(default='default/no_picture.png', upload_to='supplier/form')),
                ('address', models.CharField(blank=True, max_length=150)),
                ('description', models.CharField(blank=True, max_length=300)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('telephone', models.CharField(blank=True, max_length=300)),
            ],
        ),
    ]