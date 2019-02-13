from django.urls import path

from .views import *

urlpatterns = [
    path('nearby_restaurant/',
        SupplierNearbyView.as_view(),
        name='nearby_restaurant'),
    path('restaurant_detail/',
        SupplierMenuView.as_view(),
        name='restuarant_menu'),

]