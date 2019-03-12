from django.urls import path

from .views import *

urlpatterns = [
    path('register/',
        CustomerRecordAPIView.as_view(),
        name='register_customer'),
    path('customer_history/',
        CustomerHistoryAPIView.as_view(),
        name='get_history'),

]