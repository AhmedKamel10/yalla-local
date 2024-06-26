from django.db import models
from django.contrib.auth.models import User
from django_countries.fields import CountryField

class Product(models.Model):
    name = models.CharField(max_length=255, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    photo = models.CharField(max_length=255, null=True)
    seller = models.ForeignKey(User, null=True, default=None, on_delete=models.CASCADE)
    def __str__(self):
        return self.name
class user_cart(models.Model):
    name = models.CharField(max_length=255, default='user_cart',)
    def __str__(self):
        return f"{self.user}'s cart"
class cart_item(models.Model):
    products = models.ForeignKey(Product,  null=True, blank=True, on_delete=models.SET_NULL)
    user_id = models.ForeignKey(User, null=True, default=None, on_delete=models.CASCADE, related_name="users")
    quantity = models.IntegerField(default=1, null=True)

class brand_account(models.Model):
    author = models.ForeignKey(User, null=True, on_delete=models.CASCADE, related_name="brand_account")
    brand_name = models.CharField(max_length=200)
    country =  CountryField(blank_label="(select country)")
    username = models.CharField(max_length=255, blank=True)

class ads_item(models.Model):
    products = models.ForeignKey(Product, null=True, blank=True, on_delete=models.SET_NULL, related_name='ads_product')
    user_id = models.ForeignKey(User, default=None, null=True, on_delete=models.CASCADE, related_name="ads_user")

class order(models.Model):
    name = models.CharField(max_length=355, null=True)
    address = models.CharField(max_length=355, null=True)
    quantity = models.IntegerField(default=1, null=True)
    product = models.ForeignKey(Product, null=True, blank=True, on_delete=models.SET_NULL, related_name='order_product')
    buyer = models.ForeignKey(User, default=None, null=True, on_delete=models.CASCADE, related_name="buyer")
    seller = models.ForeignKey(User, default=None, null=True, on_delete=models.CASCADE, related_name="seller")