from django.urls import path

from .views import *

urlpatterns = [
    path('restaurant-card/',
        SupplierDetailAPIView.as_view(),
        name='nearby_restaurant'),
    path('restaurant_detail/',
        SupplierMenuAPIView.as_view(),
        name='restuarant_menu'),

]