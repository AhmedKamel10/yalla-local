# Generated by Django 3.2.25 on 2024-06-29 18:11

from django.db import migrations, models
import mainapp.models


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0011_auto_20240629_2003'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='photo',
            field=models.ImageField(blank=True, null=True, upload_to=mainapp.models.upload_to),
        ),
    ]
