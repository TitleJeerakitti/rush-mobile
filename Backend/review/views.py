from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from account.permission import IsCustomer
from .serializer import *

# Create your views here.

class ReviewDetailAPIView(APIView):
    permission_classes = [IsAuthenticated,IsCustomer]

    def get(self, request):
        serializer = GetReviewSerializer(data=request.GET)
        if serializer.is_valid(raise_exception=ValueError):
            return Response(serializer.get_method(validated_data=request.GET,request=request))


class CreateReviewAPIView(APIView):
    permission_classes = [IsAuthenticated,IsCustomer]

    def post(self ,request):
        serializer = ReviewDetailSerializer(data=request.data)
        if serializer.is_valid(raise_exception=ValueError):
            supplier = Supplier.objects.get(user__id=request.data['supplier_id'])
            return_status = request.user.get_customer().create_review(supplier,request.data['rate'],request.data['comment'])
        return Response(return_status,status=status.HTTP_200_OK)