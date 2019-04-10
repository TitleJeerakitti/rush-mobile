from django.shortcuts import render
from django.utils.timezone import datetime

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from account.permission import IsCustomer, IsSupplier
from supplier.models import Category, Supplier, MainCategory
from supplier.serializer import SupplierCardSerializers, MainCategoriesSerializer
from promotion.models import Promotion
from activity.views import restaurant_suggestion_list
from order.views import Order
from order.serializer import OrderManagementSerializer
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

#         from supplier.models import Supplier
#         try:
#             latitude = request.GET['latitude']
#             longitude = request.GET['longitude']
#         except:
#             return Response(status.HTTP_400_BAD_REQUEST)
#         supplier_list = Supplier.objects.all()
#         user_location = Point(float(longitude),float(latitude),srid=4326)
#         pnt = GEOSGeometry(user_location)

#         for supplier in supplier_list:
#             distance = supplier.distance_from_location(user_location)
#             if distance > 20:
#                 supplier_list = supplier_list.exclude(user=supplier.user)
#         supplier_sorted = sorted(supplier_list,key=lambda t:t.distance_from_location(user_location))
#         # supplier = Supplier.objects.filter(user__is_supplier=True,latitude__range=(latitude_l,latitude_h),longitude__range=(longitude_l,longitude_h))
#         # serializers = SupplierCardSerializers(
        #     supplier, many=True, context={'request': request})
        # return Response(serializers.data)


class RestaurantHomeAPIView(APIView):
    permission_classes = [IsAuthenticated, IsSupplier]

    def get(self, request):
        supplier = request.user.get_supplier()
        main_category = MainCategory.objects.filter(supplier=supplier)
        serializers = MainCategoriesSerializer(
            main_category, many=True, context={'request': request})
        return Response(serializers.data, status=status.HTTP_200_OK)


class RestaurantOrderAPIView(APIView):
    permission_classes = [IsAuthenticated, IsSupplier]

    def get(self, request):
        today = datetime.today()
        supplier = request.user.get_supplier()
        order_dict = {}
        order_list = Order.objects.filter(
            supplier=supplier, timestamp__year=today.year, timestamp__month=today.month, timestamp__day=today.day)
        order_dict['waiting_order'] = OrderManagementSerializer(
            order_list.filter(status=1).order_by('-timestamp'), many=True).data
        order_dict['cooking_order'] = OrderManagementSerializer(
            order_list.filter(status=2).order_by('-timestamp'), many=True).data
        order_dict['done_order'] = OrderManagementSerializer(
            order_list.filter(status=3).order_by('-timestamp'), many=True).data

        return Response(order_dict, status=status.HTTP_200_OK)

