from django.urls import path

from .views import *

urlpatterns = [
    path('create_new_order/',
         CreateOrderAPI.as_view(),
         name='create_order'),
    path('get_queue/',
         QueueAPI.as_view(),
         name='get_queue'),
    path('get_order/',
         OrderAPI.as_view(),
         name='get_order'),
]
