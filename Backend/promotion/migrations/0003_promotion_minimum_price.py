# Generated by Django 2.1.2 on 2019-03-10 22:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('promotion', '0002_promotion_is_display'),
    ]

    operations = [
        migrations.AddField(
            model_name='promotion',
            name='minimum_price',
            field=models.FloatField(default=0),
        ),
    ]