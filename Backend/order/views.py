from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from account.permission import IsCustomer,IsSupplier
from supplier.models import Supplier
from notification.models import Notification
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
            supplier = Supplier.objects.get(user__id=request.data['supplier_id'])
            if not supplier.is_open:
                return Response({'status':'600'},status=status.HTTP_403_FORBIDDEN)  #if supplier close
            serializer.create(validated_data=request.data,
                              customer_id=request.user.id)
            return Response({'status': status.HTTP_200_OK}, status=status.HTTP_200_OK)
        return Response({'status': status.HTTP_400_BAD_REQUEST}, status=status.HTTP_400_BAD_REQUEST)


class QueueAPIView(APIView):
    permission_classes = [IsAuthenticated,IsCustomer]

    def get(self, request):
        customer_id = request.user.id
        queue = Queue.objects.filter(
            order__customer__user__id=customer_id, order__status__lte=3).order_by('-timestamp') 
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


class UpdateOrderAPIView(APIView):
    
    def post(self, request):
        pass


class CancelOrderAPIView(APIView):
    permission_classes = [IsAuthenticated,IsCustomer]

    def post(self, request):
        try:
            id = request.data['id']
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        try:
            order = Order.objects.get(id=request.data['id'],customer=request.user.get_customer())
            if order.status != 1:
                return Response(status=status.HTTP_400_BAD_REQUEST)
            order.cancel_order()
            if order.category == Order.ONLINE:
                notification_list = order.supplier.get_notification()
                for notification in notification_list:
                    notification.send_notification(
                        message=request.user.get_customer().get_name()+ '\'s order has been cancel.',
                        title='Customer cancel an order - '+order.get_order_id(),
                        data={'status':201})
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


