from django.urls import path
from account.views import LoginRestuarantUserTokenView

from account.views import *
from api.views import *
urlpatterns = [
    path('login/', LoginRestuarantUserTokenView.as_view()),
    path('logout/', LogoutUserRevokeTokenView.as_view()),
    path('reset-password/', ResetPasswordAPIVIew.as_view()),
    path('home/', RestaurantHomeAPIView.as_view()),
]
