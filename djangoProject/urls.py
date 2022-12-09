"""djangoProject URL Configuration

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
from django.urls import path, include
from ztp5.views import *
from frontend import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('', views.index),
    path('admin/', admin.site.urls),
    path('post_dish/', post_dish),
    path('get_dish/', get_dish),
    path('delete_dish/', delete_dish),
    path('post_ingredient/', post_ingredient),
    path('get_ingredients/', get_ingredients),
    path('add_menu/', add_menu),
    path('get_menu/', get_dish),
    path('create_user/', create_user),
    path('create_order/', create_order),
    path('update_order/', update_order),
    path('delete_order/', delete_order),
    path('get_order/', get_order),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh')
    #path('', include('frontend.url')),


]
