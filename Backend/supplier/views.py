from django.shortcuts import render, get_object_or_404
from django.contrib.gis.geos import Point
from django.contrib.gis.geos import GEOSGeometry
from django.contrib.postgres.search import SearchQuery, SearchRank, SearchVector

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ParseError

from activity.models import ViewActivity
from account.permission import IsCustomer, IsSupplier
from order.serializer import CreateOrderSupplierSerializer
from order.models import Queue,Order
from .models import *
from .serializer import *


# class SupplierRecordView(APIView):

#     def get(self, format=None):
#         supplier = Supplier.objects.filter(user__is_supplier=True)
#         serializer = SupplierSerializer(
#             supplier, many=True, context={'request': request})
#         return Response(serializer.data)

#     def post(self, request):
#         serializer = SupplierSerializer(data=request.data)
#         if serializer.is_valid(raise_exception=ValueError):
#             serializer.create(validated_data=request.data)
#             return Response(serializer.validated_data, status=status.HTTP_201_CREATED)
#         return Response(serializer.error_messages,
#                         status=status.HTTP_400_BAD_REQUEST)


# class SupplierDetailView(APIView):

#     def get(self, formant=None):
#         supplier = Supplier.objects.filter(user__is_supplier=True)
#         serializers = SupplierSerializer(supplier, many=True)
#         return Response(serializers.data)
# def sort_supplier(supplier,sort_by):

#         if sort_by == 'popular':
#             return supplier


class SupplierDetailAPIView(APIView):
    permission_classes = [IsAuthenticated, IsCustomer]

    def get(self, request):
        supplier = Supplier.objects.filter(user__is_supplier=True)
        serializers = SupplierCardSerializers(
            supplier, many=True, context={'request': request})
        return Response(serializers.data)


class SupplierMenuAPIView(APIView):
    permission_classes = [IsAuthenticated, IsCustomer]

    def get(self, request):
        try:
            supplier_id = request.GET['supplier_id']
        except KeyError:
            raise ParseError('Request has no supplier_id')
        try:
            order_id = request.GET['order_id']
        except:
            order_id = None
        supplier = get_object_or_404(Supplier, user__id=supplier_id)
        if order_id is not None:
            serializers = RestaurantDetailSerializer(
                supplier, context={'request': request, 'order_id': order_id})
        else:
            serializers = RestaurantDetailSerializer(
                supplier, context={'request': request})

        ViewActivity.push(request.user, supplier, 500, 'View Supplier')
        # Telephone_Serializer
        return Response(serializers.data)


class SupplierNearByAPIView(APIView):
    permission_classes = [IsAuthenticated, IsCustomer]

    def get(self, request):
        try:
            latitude = request.GET['latitude']
            longitude = request.GET['longitude']
            sorted_by = int(request.GET['sorted_by'])
        except:
            return Response(status.HTTP_400_BAD_REQUEST)
        user_location = Point(float(longitude), float(latitude), srid=4326)
        supplier_list = Supplier.nearby(user_location)

        if sorted_by == 1:  # nearlest
            supplier_sorted = Supplier.sorted_by_distance(
                supplier_list, user_location)
        elif sorted_by == 2:  # rating
            supplier_sorted = Supplier.sorted_by_rating(supplier_list)
        elif sorted_by == 3:  # review count
            supplier_sorted = Supplier.sorted_by_review_count(supplier_list)
        else:
            return Response(status.HTTP_403_FORBIDDEN)
        serializers = SupplierCardSerializers(
            supplier_sorted, many=True, context={'request': request})
        return Response(serializers.data)


class SupplierNameAPIView(APIView):
    permission_classes = [IsAuthenticated, IsCustomer]

    def get(self, request):
        try:
            word = str(request.GET['word'])
        except:
            return Response(status.HTTP_400_BAD_REQUEST)

        supplier_list = Supplier.objects.filter(name__icontains=word)
        serializers = SupplierCardSerializers(
            supplier_list, many=True, context={'request': request})
        return Response(serializers.data)


class SupplierCategoryAPIView(APIView):
    permission_classes = [IsAuthenticated, IsCustomer]

    def get(self, request):
        try:
            category_id = request.GET['id']
        except:
            return Response(status.HTTP_400_BAD_REQUEST)
        supplier_list = Supplier.objects.filter(category__id=category_id)
        serializers = SupplierCardSerializers(
            supplier_list, many=True, context={'request': request})
        return Response(serializers.data)


class CreateEditMenu(APIView):
    permission_classes = [IsAuthenticated, IsSupplier]

    def post(self, request):
        image = request.data['image']
        menu = Menu.create(menu_id=request.data['id'],
                           name=request.data['name'],
                           price=request.data['price'],
                           is_out_of_stock=request.data['is_out_of_stock'],
                           is_display=request.data['is_display'],
                           sub_category_id=request.data['sub_category_id'])
        if image:
            menu.uploadphoto(image=image)
        return Response(status=status.HTTP_200_OK)


class CreateEditSubCategoryAPIView(APIView):
    permission_classes = [IsAuthenticated, IsSupplier]

    def post(self, request):
        sub_category = SubCategory.create(
            main_category_id=request.data['main_category_id'],
            sub_category_id=request.data['sub_category_id'],
            name=request.data['name'],
            is_display=request.data['is_display']
        )
        return Response(status=status.HTTP_200_OK)


class CreateEditMainCategoryAPIView(APIView):
    permission_classes = [IsAuthenticated, IsSupplier]

    def post(self, request):
        main_category = MainCategory.create(
            supplier=request.user.get_supplier(),
            main_category_id=request.data['main_category_id'],
            name=request.data['name'],
            is_display=request.data['is_display'],
        )
        return Response(status=status.HTTP_200_OK)


class RestaurantCreateOrderAPIView(APIView):
    permission_classes = [IsAuthenticated, IsSupplier]

    def post(self, request):
        serializer = CreateOrderSupplierSerializer(data=request.data)
        if serializer.is_valid(raise_exception=ValueError):
            order = Order.create_offline_order(
                user = request.user,
                total = request.data['total'],
                special_request= request.data['special_request'],
                discount = request.data['discount'],
                menus = request.data['menus'],
                )
            queue = Queue.create_queue(order)
            return Response(status=status.HTTP_200_OK)