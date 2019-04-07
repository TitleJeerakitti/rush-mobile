from django.shortcuts import render, get_object_or_404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ParseError

from activity.models import ViewActivity
from account.permission import IsCustomer
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
        except:
            return Response(status.HTTP_400_BAD_REQUEST)
        latitude_difference = 0.1305
        longitude_difference = 0.14
        latitude_h = float(latitude)+latitude_difference 
        latitude_l = float(latitude)-latitude_difference 
        longitude_h = float(longitude)+longitude_difference
        longitude_l = float(longitude)-longitude_difference
        supplier = Supplier.objects.filter(user__is_supplier=True,latitude__range=(latitude_l,latitude_h),longitude__range=(longitude_l,longitude_h))
        serializers = SupplierCardSerializers(
            supplier, many=True, context={'request': request})
        return Response(serializers.data)
#0.0627911,0.0731991
#13.7292128,100.7733807