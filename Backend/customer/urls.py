from django.urls import path

from .views import CustomerRecordView,CustomerHistoryView

urlpatterns = [
    path('register/',
        CustomerRecordView.as_view(),
        name='register_customer'),
    path('customer_history/',
        CustomerHistoryView.as_view(),
        name='get_history'),
]