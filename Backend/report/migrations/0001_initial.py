# Generated by Django 2.1.2 on 2019-04-18 18:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('supplier', '0011_auto_20190408_0017'),
    ]

    operations = [
        migrations.CreateModel(
            name='ReportDayMenu',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('total', models.FloatField(default=0)),
                ('amount', models.IntegerField(default=0)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('menu', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='supplier.Menu')),
            ],
        ),
        migrations.CreateModel(
            name='ReportDayTotal',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('total', models.FloatField(default=0)),
                ('order_success', models.IntegerField(default=0)),
                ('order_fail', models.IntegerField(default=0)),
            ],
        ),
    ]
