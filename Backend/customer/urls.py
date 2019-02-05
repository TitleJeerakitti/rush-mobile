from django.urls import path

from .views import CustomerRecordView

urlpatterns = [
    path('register/',
        CustomerRecordView.as_view(),
        name='register_customer'),
]