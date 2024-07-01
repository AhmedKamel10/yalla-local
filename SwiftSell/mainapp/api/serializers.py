from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from ..models import *
from django.contrib.auth.models import User
from rest_framework.pagination import PageNumberPagination
class ProductPagination(PageNumberPagination):
    page_size=10
    page_size_query_param = 'per_page'
    max_page_size = 100


class PostSerializer(ModelSerializer):
    seller = serializers.SerializerMethodField()
    photo_url = serializers.SerializerMethodField()

    def get_seller(self, product):
        return product.seller.username if product.seller else None

    def get_photo_url(self, product):
        request = self.context.get('request')
        if product.photo and request:
            return request.build_absolute_uri(product.photo.url)
        return None

    class Meta:
        model = Product
        fields = ['id', 'name', 'photo', 'photo_url', 'price', 'seller', 'description']
        extra_kwargs = {"password": {"read_only": True}}

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class CartProductsSerializer(serializers.ModelSerializer):
    products = serializers.SerializerMethodField()

    def get_products(self, cart_item):
        product = cart_item.products
        if product:
            return {
                'name': product.name,
                'photo': product.photo.url if product.photo else None,
                'price': product.price,
                'id': product.id,
                'description': product.description
            }
        else:
            return {}

    class Meta:
        model = cart_item
        fields = ['id', 'products', 'user_id']

class AddCartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = cart_item
        fields = ['id', 'products']

class AdsProductsSerializer(serializers.ModelSerializer):
    products = serializers.SerializerMethodField()

    def get_products(self, ads_item):
        product = ads_item.products
        if product:
            return {
                'name': product.name,
                'photo': product.photo.url if product.photo else None,
                'price': product.price,
                'id': product.id,
                'description': product.description
            }
        else:
            return {}

    class Meta:
        model = ads_item
        fields = ['id', 'products', 'user_id']

class AddAdsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ads_item
        fields = ['id', 'products']

class BrandsSerializer(serializers.ModelSerializer):
    cover_image_url = serializers.SerializerMethodField()

    def get_cover_image_url(self, brand_account):
        request = self.context.get('request')
        if brand_account.cover_image and request:
            return request.build_absolute_uri(brand_account.cover_image.url)
        return None

    class Meta:
        model = brand_account
        fields = ['brand_name', 'country', 'author', 'username', 'cover_image', 'cover_image_url']
        extra_kwargs = {"author": {"read_only": True}}

class OrderSerializer(serializers.ModelSerializer):
    product = serializers.SerializerMethodField()

    def get_product(self, order):
        product = order.product
        if product:
            return {
                'name': product.name,
                'photo': product.photo.url if product.photo else None,
                'price': product.price,
                'id': product.id,
                'description': product.description
            }
        else:
            return {}

    class Meta:
        model = order
        fields = ['buyer', 'seller', 'product', 'address', 'quantity', 'name', 'quantity']
