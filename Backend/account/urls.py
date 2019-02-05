from django.urls import path

from .views import LoginUserAPIView, LogoutUserAPIView


urlpatterns = [
    path('login/',
        LoginUserAPIView.as_view(),
        name='auth_user_login'),
    path('logout/',
        LogoutUserAPIView.as_view(),
        name='auth_logout')
]