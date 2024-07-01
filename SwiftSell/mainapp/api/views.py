from rest_framework.viewsets import ModelViewSet
from ..models import *
from .serializers import *
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from django.dispatch import receiver
from django.db.models.signals import post_save
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from rest_framework.pagination import PageNumberPagination
from django.db.models.functions import Lower
class StandardResultsSetPagination(PageNumberPagination):
    page_size = 6
    page_size_query_param = 'page_size'
    max_page_size = 2
    
class PostViewSet(generics.ListCreateAPIView):
    queryset = Product.objects.all().order_by(Lower("id").desc())
    serializer_class= PostSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    

    def perform_create(self, serializer):
        user = User.objects.get(pk=self.request.user.id)
        serializer.save(seller=user)
class BrandListCreate(generics.ListCreateAPIView):
    serializer_class = BrandsSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        user = User.objects.get(pk=self.request.user.id)
        return brand_account.objects.filter(author=user)
class get_brands(generics.ListCreateAPIView):
    serializer_class = BrandsSerializer
    permission_classes = [IsAuthenticated]
    queryset = brand_account.objects.all()
    def get_serializer_context(self):
        return {'request': self.request}

class createUserView(generics.CreateAPIView):
    queryset  = User.objects.all()
    serializer_class= UserSerializer
    permission_classes=[AllowAny]
class GetUsername(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            user = User.objects.get(pk=self.request.user.id)
            
            return Response({"username": user.username})
        except User.DoesNotExist:
            return Response(status=404)
@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    try:
        if created:
            user_cart.objects.create(user=instance, name=instance)
    except:
            print('error creatign user_cart')
class cart_view(ModelViewSet):
    serializer_class= CartProductsSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        queryset = cart_item.objects.filter(user_id=4)  
        return queryset
class cart_products(ModelViewSet):
    serializer_class= CartProductsSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        logged_in_user = self.request.user
        queryset = cart_item.objects.filter(user_id=logged_in_user) 
        return queryset
    @action(detail=False, methods=['post'])
    def add_to_cart(self, request):
        serializer = AddCartItemSerializer(data=request.data)

        if serializer.is_valid():
            product_id = serializer.validated_data['products']
            user = User.objects.get(id=self.request.user.id)

            if not cart_item.objects.filter(products_id=product_id.id, user_id=user).exists():
                cart_item.objects.create(products_id=product_id.id, user_id=user)
                return Response({"message": "Product added to cart"}, status=200)
            else:
                print('already exists')
                return Response(serializer.errors, status=400)
        else:
            return Response(serializer.errors, status=400)
    @action(detail=False, methods=['post'])
    def delete_from_cart(self, request):
        serializer = AddCartItemSerializer(data=request.data)
        
        if serializer.is_valid():
            product_id = serializer.validated_data['products']
            user = User.objects.get(id=self.request.user.id)
            cart_item.objects.filter(products_id=product_id.id, user_id=user).delete()
            return Response({"message": "Product added to cart"}, status=200)
        
        else:
            return Response(serializer.errors, status=400)
class orders(ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes= [IsAuthenticated]
    def get_queryset(self):
        logged_in_user = self.request.user
        queryset = order.objects.filter(seller=logged_in_user)
        return queryset

    @action(detail=False, methods=['post'])
    def add_to_orders(self, request):
        product_id = request.data.get('product')
        name = request.data.get('name')
        address= request.data.get('address')
        number= request.data.get('number')
        if product_id is not None:
            product = get_object_or_404(Product, id=product_id)
            try:
                if not order.objects.filter(seller=product.seller, product=product, buyer=self.request.user, name=name).exists():
                    order.objects.create(seller=product.seller, product=product, buyer=self.request.user, name=name, address=address, quantity=number)

                    return Response({"message": "Order created"}, status=201)
            except Exception as e:
                return Response({"message": "Error creating order"}, status=400)
        else:
            return Response({"message": "Invalid request"}, status=400)

    @action(detail=False, methods=['post'])
    def delete_from_orders(self, request):
        product_id = request.data.get('product')
        name = request.data.get('name')

        
        if product_id is not None:
            product = get_object_or_404(Product, id=product_id)
            try:
                order_to_delete = order.objects.get(seller=product.seller, product=product,name=name)
                order_to_delete.delete()
                return Response({"message": "Order deleted"}, status=200)
            except order.DoesNotExist:
                return Response({"message": "Order not found"}, status=404)
        else:
            return Response({"message": "Invalid request"}, status=400)
class ads_products(ModelViewSet):
    serializer_class= AdsProductsSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        logged_in_user = self.request.user
        queryset = ads_item.objects.filter(user_id=logged_in_user) 
        return queryset
    @action(detail=False, methods=['post'])
    def add_to_ads(self, request):
        serializer = AddAdsSerializer(data=request.data)
        if serializer.is_valid():
            product_id = serializer.validated_data['products']
            user = User.objects.get(id=self.request.user.id)
            if not ads_item.objects.filter(products_id=product_id.id, user_id=user).exists():
                ads_item.objects.create(products_id=product_id.id, user_id=user)
                return Response({"message": "Product added to cart"}, status=200)
            else:
                print('already exists')
                return Response(serializer.errors, status=400)
        else:
            return Response(serializer.errors, status=400)
    @action(detail=False, methods=['post'])
    def delete_from_ads(self, request):
        serializer = AddAdsSerializer(data=request.data)
        
        if serializer.is_valid():
            product_id = serializer.validated_data['products']
            user = User.objects.get(id=self.request.user.id)
            ads_item.objects.filter(products_id=product_id.id, user_id=user).delete()
            cart_item.objects.filter(products_id = product_id.id, user_id = user).delete()
            Product.objects.filter(name=product_id).delete()


            return Response({"message": "Product added to cart"}, status=200)
        
        else:
            return Response(serializer.errors, status=400)
        



