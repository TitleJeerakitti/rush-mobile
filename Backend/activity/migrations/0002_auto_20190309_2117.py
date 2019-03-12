# Generated by Django 2.1.2 on 2019-03-09 21:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('contenttypes', '0002_remove_content_type_name'),
        ('supplier', '0001_initial'),
        ('activity', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ViewActivity',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('supplier', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='supplier.Supplier')),
            ],
        ),
        migrations.AddField(
            model_name='activity',
            name='content_type',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='contenttypes.ContentType'),
        ),
        migrations.AddField(
            model_name='activity',
            name='object_id',
            field=models.PositiveIntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='activity',
            name='action',
            field=models.IntegerField(choices=[(100, 'Login - App'), (101, 'Login - App Facebook'), (200, 'SignUp Customer - App'), (201, 'SignUp Customer - App Facebook'), (202, 'SighUp Supplier - App'), (300, 'Logout - App'), (500, 'View Supplier - Nearest'), (501, 'View Supplier - Category'), (502, 'View Supplier - Popular'), (600, 'Pay Success - App')]),
        ),
    ]
