# Generated by Django 3.2.25 on 2024-06-21 04:31

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('mainapp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='brand_account',
            name='seller_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='brand_account', to=settings.AUTH_USER_MODEL),
        ),
    ]
