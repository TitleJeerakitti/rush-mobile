from django.urls import path

from .views import *

urlpatterns = [
    path('get_review/',
        ReveiewDetailView.as_view(),
        name='get_review'
    )
]
