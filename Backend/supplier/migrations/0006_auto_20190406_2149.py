# Generated by Django 2.1.2 on 2019-04-06 21:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('supplier', '0005_menu_is_out_of_stock'),
    ]

    operations = [
        migrations.AlterField(
            model_name='menu',
            name='image',
            field=models.ImageField(blank=True, default='supplier/menu/food_default.png', null=True, upload_to='supplier/menu'),
        ),
    ]
