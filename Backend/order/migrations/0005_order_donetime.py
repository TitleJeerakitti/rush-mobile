# Generated by Django 2.1.2 on 2019-04-16 18:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0004_auto_20190408_0042'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='donetime',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]