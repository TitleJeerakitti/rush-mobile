from django.urls import path

from .views import *

urlpatterns = [
    path('create_new_order/',
         CreateOrderAPIView.as_view(),
         name='create_order'),
    path('get_queue/',
         QueueAPIView.as_view(),
         name='get_queue'),
    path('get_order/',
         OrderAPIView.as_view(),
         name='get_order'),
]
