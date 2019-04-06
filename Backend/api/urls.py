from django.urls import path

from account.views import GetCustomerData

from .views import *

urlpatterns = [
    path('home', HomeAPIView.as_view()),
    path('get-customer-data',GetCustomerData.as_view()),
    # path('test', TestAPIView.as_view()),
]
