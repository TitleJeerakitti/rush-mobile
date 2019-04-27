from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Promotion
from .serializer import PromotionSerializers


class PromotionAPIView(APIView):
    def get(self, request):
        promotion = Promotion.objects.filter(is_display=True)
        serializer = PromotionSerializers(promotion,many=True,context={'request':request})
        return Response(serializer.data,status=status.HTTP_200_OK)