from rest_framework.viewsets import ModelViewSet
from ..models import Product, user_cart, cart_item, ads_item
from .serializers import PostSerializer, CartProductsSerializer, AddCartItemSerializer, AdsProductsSerializer, AddAdsSerializer
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from django.dispatch import receiver
from django.db.models.signals import post_save
from rest_framework.decorators import action
class PostViewSet(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class= PostSerializer
    permission_classes = [IsAuthenticated]
    def perform_create(self, serializer):
        user = User.objects.get(pk=self.request.user.id)
        print(user)
        serializer.save(seller=user)



class createUserView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    queryset  = User.objects.all()
    serializer_class= UserSerializer
    

class GetUsername(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        try:
            user = User.objects.get(pk=self.request.user.id)
            print(user)
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



from rest_framework.permissions import BasePermission

class IsOwnerOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        # Allow read permissions for all users
        if request.method in ['GET', 'HEAD', 'OPTIONS']:
            return True
        # Check if the user is the owner of the cart item
        return obj.user_id == request.user.id
class cart_view(ModelViewSet):
    serializer_class= CartProductsSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        queryset = cart_item.objects.filter(user_id=4)  
        for i in queryset:
            print(i.products)  
        print(queryset)
        
        return queryset
class CheckLoggedIn(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # If the user is authenticated, return a success message
        return Response({'message': 'You are logged in'})

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
            print(product_id.id)
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
            print(product_id.id)
            user = User.objects.get(id=self.request.user.id)
            cart_item.objects.filter(products_id=product_id.id, user_id=user).delete()
            return Response({"message": "Product added to cart"}, status=200)
        
        else:
            return Response(serializer.errors, status=400)
        


class ads_products(ModelViewSet):
    serializer_class= AdsProductsSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        logged_in_user = self.request.user
        queryset = ads_item.objects.filter(user_id=logged_in_user) 
        print(queryset)
        return queryset
    

    @action(detail=False, methods=['post'])
    def add_to_ads(self, request):
        serializer = AddAdsSerializer(data=request.data)
        if serializer.is_valid():
            product_id = serializer.validated_data['products']
            print(product_id.id)
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
            print(product_id.id)
            user = User.objects.get(id=self.request.user.id)
            ads_item.objects.filter(products_id=product_id.id, user_id=user).delete()
            print(cart_item.objects.all())
            Product.objects.filter(name=product_id).delete()


            return Response({"message": "Product added to cart"}, status=200)
        
        else:
            return Response(serializer.errors, status=400)