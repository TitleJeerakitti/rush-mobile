# Generated by Django 2.1.2 on 2019-04-07 00:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('testing', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='restaurant',
            name='image',
            field=models.ImageField(default='default/no_picture.png', upload_to='testing'),
        ),
    ]
