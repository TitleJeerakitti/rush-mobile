from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('restaurant',views.get_rest_list, name='get_rest_list'),
    path('datetime',views.TestingApiView.as_view(),name='get_date_time')
]