from django.urls import path

from .views import *

urlpatterns = [
    path('nearbyRestaurant/',
        SupplierNearbyView.as_view(),
        name='nearby_restaurant'),
    path('restaurantDetail/',
        SupplierMenuView.as_view(),
        name='restuarant_menu'),

]