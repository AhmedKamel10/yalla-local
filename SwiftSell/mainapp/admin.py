from django.contrib import admin
from .models import Product, cart_item, brand_account, ads_item
# Register your models here.
admin.site.register(Product)
admin.site.register(brand_account)
admin.site.register(cart_item)
admin.site.register(ads_item)