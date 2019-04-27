# Generated by Django 2.1.2 on 2019-04-18 18:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('supplier', '0011_auto_20190408_0017'),
        ('report', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='reportdaymenu',
            name='supplier',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='supplier.Supplier'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='reportdaytotal',
            name='supplier',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='supplier.Supplier'),
            preserve_default=False,
        ),
    ]
