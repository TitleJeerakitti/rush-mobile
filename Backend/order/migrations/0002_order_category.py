# Generated by Django 2.1.2 on 2019-03-02 18:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='category',
            field=models.CharField(choices=[('A', 'Walk in'), ('R', 'Online')], default='R', max_length=1),
        ),
    ]