from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from account.permission import IsCustomer
from supplier.models import Category
from supplier.serializer import SupplierCardSerializers
from promotion.models import Promotion
from activity.views import restaurant_suggestion_list

from .serializers import *


class HomeAPIView(APIView):
    permission_classes = [IsAuthenticated, IsCustomer]

    def get(self, request):
        slide_banner = Promotion.objects.filter(
            is_banner=True, is_display=True)
        slide_banner_serializer = SlideBannerSerializer(
            slide_banner, many=True, context={'request': request})
        category = Category.objects.filter(is_home=True, is_display=True)
        category_serializer = CategorySerializer(
            category, many=True, context={'request': request})
        suggest_list = restaurant_suggestion_list(user=request.user)
        suggest_list_serializer = SupplierCardSerializers(
            suggest_list, many=True, context={'request': request})
        return Response({"slide_banner": slide_banner_serializer.data,
                         "category": category_serializer.data,
                         "suggest_list": suggest_list_serializer.data}, status=status.HTTP_200_OK)

# class TestAPIView(APIView):
#     permission_classes = ()

#     def get(self, request):
#         from rush.settings import MEDIA_ROOT
#         from customer.models import Customer
#         from django.core.files import File  # you need this somewhere
#         import urllib

#         customer = Customer.objects.get(user__username='customer')
#         result = urllib.urlretrieve(MEDIA_ROOT+'/default_user.png')
#         customer.profile_picture.save(,FILE
#         return Response(status=status.HTTP_200_OK)
