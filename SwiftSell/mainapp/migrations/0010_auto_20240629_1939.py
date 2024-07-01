# Generated by Django 3.2.25 on 2024-06-29 17:39

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0009_product_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='brand_account',
            name='cover_image',
            field=models.ImageField(default=django.utils.timezone.now, upload_to=''),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='product',
            name='cover_image',
            field=models.ImageField(default='path/to/default/image.jpg', upload_to=''),
        ),
    ]
