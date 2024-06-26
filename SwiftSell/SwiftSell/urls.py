"""SwiftSell URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path ,include
from mainapp.api.views import createUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshSlidingView
from mainapp.api import views
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('SwiftSell.api.urls')),
    path("api/user/register/", createUserView.as_view(), name="register"),
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", TokenRefreshSlidingView.as_view(), name="refresh"),
    path("api-auth/", include("rest_framework.urls")),
    path("api/products/", views.PostViewSet.as_view(), name="products-list"),
    path("api/get-username/", views.GetUsername.as_view()),
    path("api/cart_products/", views.cart_products.as_view({'get': 'list'})),
    path('api/cart_products/add_to_cart/', views.cart_products.as_view({'post': 'add_to_cart'}), name='add-to-cart'),
    path('api/cart_products/delete_from_cart/', views.cart_products.as_view({'post': 'delete_from_cart'}), name='delete-from-cart'),
    path("api/ads_products/", views.ads_products.as_view({'get': 'list'})),
    path('api/ads_products/add_to_ads/', views.ads_products.as_view({'post': 'add_to_ads'}), name='add-to-ads'),
    path('api/ads_products/delete_from_ads/', views.ads_products.as_view({'post':'delete_from_ads'}), name="delete-from-ads"),
    path('api/brand_account/' , views.BrandListCreate.as_view(), name="brand_account"),
    path('api/get_brands/' , views.get_brands.as_view(), name="get_brands"),
    path('api/orders/', views.orders.as_view({'get':'list'})),
    path('api/orders/add_to_orders/', views.orders.as_view({'post': 'add_to_orders'}), name="add-to-orders"),
    path('api/orders/delete_from_orders/', views.orders.as_view({'post': 'delete_from_orders'}), name='delete_from_orders')

]
