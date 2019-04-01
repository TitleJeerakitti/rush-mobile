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
           create_response = serializer.create(validated_data=request.data,request=request)
        return create_response