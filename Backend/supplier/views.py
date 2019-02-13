from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny

from .models import *
from .serializer import *


class SupplierRecordView(APIView):

    def get(self, format=None):
        supplier = Supplier.objects.filter(user__is_supplier=True)
        serializer = SupplierSerializer(
            supplier, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request):
        serializer = SupplierSerializer(data=request.data)
        if serializer.is_valid(raise_exception=ValueError):
            serializer.create(validated_data=request.data)
            return Response(serializer.validated_data, status=status.HTTP_201_CREATED)
        return Response(serializer.error_messages,
                        status=status.HTTP_400_BAD_REQUEST)


class SupplierDetailView(APIView):

    def get(self, formant=None):
        supplier = Supplier.objects.filter(user__is_supplier=True)
        serializers = SupplierSerializer(supplier, many=True)
        return Response(serializers.data)


class SupplierNearbyView(APIView):

    def get(self, request):
        supplier = Supplier.objects.filter(user__is_supplier=True)
        serializers = SupplierCardSerializers(
            supplier, many=True, context={'request': request})
        return Response(serializers.data)


class SupplierMenuView(APIView):

    def get(self, request):
        try: 
            supplier_id = request.GET['supplier_id']
        except:
            return Response(status.HTTP_400_BAD_REQUEST)
        try:
            order_id = request.GET['order_id']
        except:
            order_id = None
        supplier = Supplier.objects.get(user__id=supplier_id)

        if order_id is not None:
            serializers = RestaurantDetailSerializer(
                supplier, context={'request': request, 'order_id': order_id})
        else:
            serializers = RestaurantDetailSerializer(
                supplier, context={'request': request})

        # Telephone_Serializer
        return Response(serializers.data)
