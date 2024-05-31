from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import PostViewSet, cart_view

post_router = DefaultRouter()
cart_router = DefaultRouter()
post_router.register(r'user_cart', cart_view, basename='user_cart')