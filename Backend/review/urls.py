from django.urls import path

from .views import *

urlpatterns = [
    path('get_review/',
         ReviewDetailAPIView.as_view(),
         name='get_review'),
    path('create-review/',
         CreateReviewAPIView.as_view(),
         name='create_reivew'),
]
