from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from account.permission import IsCustomer
from .serializer import CreateOrderSerializer, QueueDetailSerializer, OrderReceiptSerializer, ConfirmOrderSerializer
from .models import Queue, Order
# Create your views here.


class CheckPromotionAPIView(APIView):
    permission_classes = [IsAuthenticated,IsCustomer]

    def post(self, request):
        serializer = ConfirmOrderSerializer(data=request.data)
        if serializer.is_valid(raise_exception=ValueError):
            return serializer.check_can_used(validated_data=request.data,
                                             customer=request.user.get_customer())


class CreateOrderAPIView(APIView):
    permission_classes = [IsAuthenticated,IsCustomer]

    def post(self, request):
        serializer = CreateOrderSerializer(data=request.data)
        if serializer.is_valid(raise_exception=ValueError):
            serializer.create(validated_data=request.data,
                              customer_id=request.user.id)
            return Response({'success': 'Successful Create Order'}, status=status.HTTP_200_OK)
        return Response({'error': 'Unauthorized access'}, status=status.HTTP_200_OK)


class QueueAPIView(APIView):
    permission_classes = [IsAuthenticated,IsCustomer]

    def get(self, request):
        customer_id = request.user.id
        queue = Queue.objects.filter(
            order__customer__user__id=customer_id, status=1).order_by('-timestamp')
        serializer = QueueDetailSerializer(
            queue, many=True, context={'request': request})
        return Response(serializer.data)


class OrderAPIView(APIView):
    permission_classes = [IsAuthenticated,IsCustomer]
    
    def get(self, request):
        if request.GET.get('order_id'):
            order_id = request.GET.get('order_id')
        else:
            return Response({"error": "No order_id"}, status=status.HTTP_400_BAD_REQUEST)

        order = Order.objects.get(id=order_id)
        serializer = OrderReceiptSerializer(
            order, context={'request': request})
        return Response(serializer.data)


# class UpdateOrderAPIView(APIView):
    
#     def post(self, request):
        