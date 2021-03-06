# Generated by Django 2.1.2 on 2019-03-02 18:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('supplier', '0001_initial'),
        ('order', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Promotion',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=250)),
                ('image', models.ImageField(upload_to='promotion')),
                ('promotion_code', models.CharField(max_length=5)),
                ('description', models.CharField(blank=True, max_length=250)),
                ('discount_price', models.FloatField(default=0)),
                ('discount_percent', models.IntegerField(default=0)),
                ('supplier', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='supplier.Supplier')),
            ],
        ),
        migrations.CreateModel(
            name='PromotionUsage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='order.Order')),
                ('promotion', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='promotion.Promotion')),
            ],
        ),
    ]
