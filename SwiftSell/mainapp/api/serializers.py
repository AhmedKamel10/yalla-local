from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from ..models import *
from django.contrib.auth.models import User

class PostSerializer(ModelSerializer):
    seller = serializers.SerializerMethodField()

    def get_seller(self, product):
        return product.seller.username if product.seller else None
    class Meta:
        model = Product
        fields = ['id','name', 'photo', 'price', 'seller']
        extra_kwargs = {"password": {"read_only": True} }
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user
     
class CartProductsSerializer(serializers.ModelSerializer):

    products = serializers.SerializerMethodField()

    def get_products(self, cart_item):
        product = cart_item.products
        if product:
            return{
                    
                    'name': product.name,
                    'photo': product.photo,
                    'price':product.price,
                    'id': product.id
                }
        else:
            return {}


    class Meta:
        model = cart_item
        fields= ['id', 'products', 'user_id']
    
class AddCartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = cart_item
        fields = ['id', 'products']

class AdsProductsSerializer(serializers.ModelSerializer):

    products = serializers.SerializerMethodField()

    def get_products(self, ads_item):
        product = ads_item.products
        return{
            'name': product.name,
            'photo': product.photo,
            'price':product.price,
            'id': product.id
        }

    class Meta:
        model = ads_item
        fields= ['id', 'products', 'user_id']
class AddAdsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ads_item
        fields = ['id', 'products']
class BrandsSerializer(serializers.ModelSerializer):
    class Meta:
        model = brand_account
        fields = ['brand_name', 'country', 'author', 'username']
        extra_kwargs = {"author": {"read_only": True } }
class OrderSerializer(serializers.ModelSerializer):
    product = serializers.SerializerMethodField()
    def get_product(self, order):
        product = order.product

        if product:
                return{
                        
                        'name': product.name,
                        'photo': product.photo,
                        'price':product.price,
                        'id': product.id,
                        
                    }
        else:
            return {}
    class Meta:
        model = order
        fields = ['buyer', 'seller', 'product', 'address', 'quantity', 'name']
