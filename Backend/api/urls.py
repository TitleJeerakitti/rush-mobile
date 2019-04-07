from django.urls import path

from account.views import GetCustomerData
from customer.views import CustomerHistoryAPIView,CustomerProfileAPIView
from promotion.views import PromotionAPIView
from .views import *

urlpatterns = [
    path('home', HomeAPIView.as_view()),
    path('get-customer-data',GetCustomerData.as_view()),
    path('get-customer-history',CustomerHistoryAPIView.as_view()),
    path('customer-profile',CustomerProfileAPIView.as_view()),
    path('get-promotion',PromotionAPIView.as_view())
    # path('test', TestAPIView.as_view()),
]
