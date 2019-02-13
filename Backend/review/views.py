from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from .serializer import *

# Create your views here.

class ReveiewDetailView(APIView):

    def get(self, request):
        serializer = GetReviewSerializer(data=request.GET)
        if serializer.is_valid(raise_exception=ValueError):
            return Response(serializer.get_method(validate_data=request.GET,request=request))