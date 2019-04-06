from django.urls import path

from .views import *

urlpatterns = [
    path('restaurant-card/',
        SupplierDetailAPIView.as_view(),
        name='restuarant_card'),
    path('restaurant_detail/',
        SupplierMenuAPIView.as_view(),
        name='restuarant_menu'),
    path('restaurant-nearby/',
        SupplierNearByAPIView.as_view(),
        name='restaurant_nearby')
]