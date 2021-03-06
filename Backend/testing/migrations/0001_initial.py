# Generated by Django 2.1.2 on 2019-03-02 18:09

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Restaurant',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('rating', models.FloatField(blank=True, default=None, null=True)),
                ('reviewCount', models.IntegerField(default=0)),
                ('category', models.CharField(max_length=200)),
                ('isOpen', models.BooleanField(default=False)),
                ('distance', models.FloatField(blank=True, default=None, null=True)),
                ('image', models.ImageField(upload_to='testing')),
            ],
        ),
        migrations.CreateModel(
            name='Testing',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_time', models.DateTimeField(auto_now_add=True)),
                ('name', models.CharField(max_length=200)),
            ],
        ),
    ]
