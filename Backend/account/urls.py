from django.urls import path, include, reverse_lazy
from django.contrib.auth import views as auth_views
from .views import *


urlpatterns = [
    path('login/',
         LoginUserTokenView.as_view(),
         name='login'),
    path('logout/',
         LogoutUserRevokeTokenView.as_view(),
         name='logout'),
    path('login-facebook/',
         LoginFacebookConvertTokenView.as_view(),
         name='login_facebook'),
    path('register-customer/',
         RegisterCustomerAPIView.as_view(),
         name='register_customer'),
    path('upload-customer-profile-picture/',
         UploadCustomerProfileAPIView.as_view(),
         name='upload_customer_profile_picture'),
    path('reset-password/',
         ResetPasswordAPIVIew.as_view(),
         name='reset_password'),
    path('django-auth/', include('django.contrib.auth.urls')),
]
