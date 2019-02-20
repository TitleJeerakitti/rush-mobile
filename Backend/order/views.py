from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny

from .serializer import CreateOrderSerializer, QueueDetailSerializer, OrderReceiptSerializer
from .models import Queue, Order
# Create your views here.


class CreateOrderAPIView(APIView):

    def post(self, request):
        serializer = CreateOrderSerializer(data=request.data)
        if serializer.is_valid(raise_exception=ValueError):
            serializer.create(validated_data=request.data)
            return Response({'success':'Successful Create Order'},status=status.HTTP_200_OK)
        return Response({'error':'Unauthorized access'},status=status.HTTP_200_OK)


class QueueAPIView(APIView):

    def get(self, request):
        if request.GET.get('customer_id'):
            customer_id = request.GET.get('customer_id')
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        queue = Queue.objects.filter(order__customer__user__id=customer_id, status=1).order_by('-timestamp')
        serializer = QueueDetailSerializer(
            queue, many=True, context={'request': request})
        return Response(serializer.data)


class OrderAPIView(APIView):

    def get(self, request):
        if request.GET.get('order_id'):
            order_id = request.GET.get('order_id')
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        order = Order.objects.get(id=order_id)
        serializer = OrderReceiptSerializer(
            order, context={'request': request})
        return Response(serializer.data)
