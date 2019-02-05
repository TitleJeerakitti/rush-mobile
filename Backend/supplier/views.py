from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny

from .models import *
from .serializer import *


class SupplierRecordView(APIView):
    permission_classes = [AllowAny]

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
    permission_classes = [AllowAny]

    def get(self, formant=None):
        supplier = Supplier.objects.filter(user__is_supplier=True)
        serializers = SupplierSerializer(supplier, many=True)
        return Response(serializers.data)


class SupplierNearbyView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        supplier = Supplier.objects.filter(user__is_supplier=True)
        serializers = SupplierNearbySerializer(
                supplier, many=True, context={'request': request})
        return Response(serializers.data)


class SupplierMenuView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        if request.GET.get('id'):
            user_id = request.GET['id']
        supplier = Supplier.objects.get(user__id=user_id)
        serializers = RestaurantDetailSerializer(
            supplier, context={'request': request})

        # Telephone_Serializer
        return Response(serializers.data)
