from django.urls import path,include

from account.views import GetCustomerData
from customer.views import CustomerHistoryAPIView,CustomerProfileAPIView
from promotion.views import PromotionAPIView
from review.views import CreateReviewAPIView
from order.views import CancelOrderAPIView
from .views import *

urlpatterns = [
    path('home', HomeAPIView.as_view()),
    path('get-customer-data',GetCustomerData.as_view()),
    path('get-customer-history',CustomerHistoryAPIView.as_view()),
    path('customer-profile',CustomerProfileAPIView.as_view()),
    path('get-promotion',PromotionAPIView.as_view()),
    path('create-review',CreateReviewAPIView.as_view()),
    path('customer-cancel-order',CancelOrderAPIView.as_view()),
    path('restaurant/',include('api.restaurant-urls')),

    # path('test', TestAPIView.as_view()),
]
