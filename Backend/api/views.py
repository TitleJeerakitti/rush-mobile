from django.shortcuts import render
from django.utils.timezone import datetime
from datetime import timedelta

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from account.permission import IsCustomer, IsSupplier
from supplier.models import Category, Supplier, MainCategory
from supplier.serializer import SupplierCardSerializers, MainCategoriesSerializer,MainCategoriesSupplierSerializer
from promotion.models import Promotion
from activity.views import restaurant_suggestion_list
from order.models import Order, Queue
from order.serializer import OrderManagementSerializer, OrderRestaurantDetailSerializer, QueueManagementSerializer
from report.models import *
from .serializers import *
from report.serializers import *
from notification.models import Notification

class HomeAPIView(APIView):
    permission_classes = [IsAuthenticated, IsCustomer]

    def get(self, request):
        slide_banner = Promotion.objects.filter(
            is_banner=True, is_display=True)
        slide_banner_serializer = SlideBannerSerializer(
            slide_banner, many=True, context={'request': request})
        category = Category.objects.filter(is_home=True, is_display=True)
        category_serializer = CategorySerializer(
            category, many=True, context={'request': request})
        suggest_list = restaurant_suggestion_list(user=request.user)
        suggest_list_serializer = SupplierCardSerializers(
            suggest_list, many=True, context={'request': request})
        return Response({"slide_banner": slide_banner_serializer.data,
                         "category": category_serializer.data,
                         "suggest_list": suggest_list_serializer.data}, status=status.HTTP_200_OK)

                    
# class TestAPIView(APIView):
#     permission_classes = ()

#     def post(self, request):
#         send_push_message(token=request.data['expo_token'],
#                           message='testing',
#                           title='title_testing',
#                           extra={'test':'send_data'})
class UploadExpoTokenAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        notification = Notification.objects.filter(expo_token=str(request.data['expo_token']))
        if notification:
            return Response(status=status.HTTP_200_OK)
        else:
            Notification.create(
                user=request.user,
                token=str(request.data['expo_token'])
            )
        return Response(status=status.HTTP_200_OK)


class RestaurantHomeAPIView(APIView):
    permission_classes = [IsAuthenticated, IsSupplier]

    def get(self, request):
        supplier = request.user.get_supplier()
        main_category = MainCategory.objects.filter(
            supplier=supplier, is_display=True)
        serializers = MainCategoriesSupplierSerializer(
            main_category, many=True, context={'request': request})
        return Response(serializers.data, status=status.HTTP_200_OK)


class RestaurantOrderAPIView(APIView):
    permission_classes = [IsAuthenticated, IsSupplier]

    def get(self, request):
        today = datetime.today()
        supplier = request.user.get_supplier()
        order_dict = {}
        order_list = Order.objects.filter(
            supplier=supplier, timestamp__year=today.year, timestamp__month=today.month, timestamp__day=today.day)
        order_dict['waiting_order'] = OrderManagementSerializer(
            order_list.filter(status=1).order_by('-timestamp'), many=True).data
        order_dict['cooking_order'] = OrderManagementSerializer(
            order_list.filter(status=2).order_by('-timestamp'), many=True).data
        order_dict['done_order'] = OrderManagementSerializer(
            order_list.filter(status=3).order_by('-timestamp'), many=True).data
        order_dict['cancel_order'] = OrderManagementSerializer(
            order_list.filter(status=4).order_by('-timestamp'), many=True).data
        return Response(order_dict, status=status.HTTP_200_OK)


class RestaurantOrderDetailAPIView(APIView):
    permission_classes = [IsAuthenticated, IsSupplier]

    def get(self, request):
        supplier = request.user.get_supplier()
        order = Order.objects.get(
            id=request.GET['id'], supplier=supplier)
        serializer = OrderRestaurantDetailSerializer(
            order, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class RestaurantUpdateOrderAPIView(APIView):
    permission_classes = [IsAuthenticated, IsSupplier]

    def post(self, request):
        supplier = request.user.get_supplier()
        order = Order.objects.get(id=request.data['id'], supplier=supplier)
        order.update_status(int(request.data['status']))
        if order.category == Order.ONLINE:
            
            notification_list = order.customer.get_notification()
            queue = Queue.objects.get(order=order)
            if request.data['status'] == 1 or request.data['status'] == 2 or request.data['status'] == 3:
                data_status = 100
            else:
                data_status = 101
            for notification in notification_list:
                notification.send_notification(
                    message='Your order is '+order.get_order_status(),
                    title=supplier.name+' - '+queue.queue_number,
                    data={'status':data_status})
        return Response(status=status.HTTP_200_OK)


class QueueManagementAPIView(APIView):
    permission_classes = [IsAuthenticated, IsSupplier]

    def get(self, request):
        today = datetime.today()
        supplier = request.user.get_supplier()
        queue_list = Queue.objects.filter(order__supplier=supplier, status=2,
                                          timestamp__year=today.year, timestamp__month=today.month,
                                          timestamp__day=today.day).order_by('-donetime')
        online_serializer = QueueManagementSerializer(
            queue_list.filter(order__category=Order.ONLINE), many=True)
        offline_serializer = QueueManagementSerializer(
            queue_list.filter(order__category=Order.WALKIN), many=True)

        return Response({'online_queue': online_serializer.data, 'offline_queue': offline_serializer.data}, status=status.HTTP_200_OK)


class OpenOrCloseShopAPIView(APIView):
    permission_classes = [IsAuthenticated, IsSupplier]

    def get(self, request):
        supplier = request.user.get_supplier()
        supplier.open_close()
        return Response({'is_open': supplier.is_open}, status=status.HTTP_200_OK)


class ReportAPIView(APIView):
    permission_classes = [IsAuthenticated, IsSupplier]

    def post(self, request):
        mode = int(request.data['status'])

        supplier = request.user.get_supplier()
        if mode == 1:
            time = datetime.strptime(request.data['start_date'], '%Y-%m-%d')
            report_day_total = ReportDayTotal.objects.filter(
                supplier=supplier, timestamp__year=time.year, timestamp__month=time.month, timestamp__day=time.day)
            serializer_total = ReportDayTotalSerializer(
                report_day_total, many=True)
            report_day_menu_list = ReportDayMenu.objects.filter(
                supplier=supplier, timestamp__year=time.year, timestamp__month=time.month, timestamp__day=time.day).order_by('-amount')
            serializer_top_menu = ReportDayMenuSerializer(
                report_day_menu_list, many=True, context={'request': request})
            order_list = Order.objects.filter(
                status__gte=4, supplier=supplier, timestamp__year=time.year, timestamp__month=time.month, timestamp__day=time.day)
            serializer_order = OrderManagementSerializer(order_list, many=True)
            serializer_summary = ReportDayTotalSumSerializer(ReportDayTotal.sum_from_list(report_day_total))            
            return Response({'summary': serializer_summary.data, 'top_menu': serializer_top_menu.data,
                             'order': serializer_order.data}, status=status.HTTP_200_OK)
        elif mode == 2:
            start_time = datetime.strptime(
                request.data['start_date'], '%Y-%m-%d')
            end_time = datetime.strptime(
                request.data['end_date'], '%Y-%m-%d')+timedelta(days=1)
            report_day_total = ReportDayTotal.objects.filter(
                supplier=supplier, timestamp__range=[start_time, end_time]).order_by('timestamp')
            serializer_total = ReportDayTotalSerializer(
                report_day_total, many=True)
            report_day_menu = ReportDayMenu.get_top_menu_list(supplier, ReportDayMenu.objects.filter(
                supplier=supplier, timestamp__range=[start_time, end_time]))
            serializer_top_menu = ReportDayMenuSumSerializer(
                report_day_menu, many=True, context={'request': request})
            serializer_summary = ReportDayTotalSumSerializer(ReportDayTotal.sum_from_list(report_day_total))            
            return Response({'summary':serializer_summary.data,'total': serializer_total.data, 'top_menu': serializer_top_menu.data}, status=status.HTTP_200_OK)
        elif mode == 3:
            time = datetime.strptime(request.data['start_date'], '%Y-%m-%d')
            report_day_total = ReportDayTotal.objects.filter(
                supplier=supplier, timestamp__month=time.month, timestamp__year=time.year).order_by('timestamp')
            serializer_total = ReportDayTotalSerializer(
                report_day_total, many=True)
            report_day_menu = ReportDayMenu.get_top_menu_list(supplier, ReportDayMenu.objects.filter(
                supplier=supplier, timestamp__month=time.month, timestamp__year=time.year))
            serializer_top_menu = ReportDayMenuSumSerializer(
                report_day_menu, many=True, context={'request': request})
            serializer_summary = ReportDayTotalSumSerializer(ReportDayTotal.sum_from_list(report_day_total))            
            return Response({'summary':serializer_summary.data,'total': serializer_total.data, 'top_menu': serializer_top_menu.data}, status=status.HTTP_200_OK)
        elif mode == 4:
            time = datetime.strptime(request.data['start_date'], '%Y-%m-%d')
            report_day_total = ReportDayTotal.objects.filter(
                supplier=supplier, timestamp__year=time.year)
            serializer_total = ReportMonthTotalSumSerializer(
                                ReportDayTotal.sum_month(report_day_total), many=True)
            report_day_menu = ReportDayMenu.get_top_menu_list(
                supplier, ReportDayMenu.objects.filter(supplier=supplier, timestamp__year=time.year))
            serializer_top_menu = ReportDayMenuSumSerializer(
                report_day_menu, many=True, context={'request': request})
            serializer_summary = ReportDayTotalSumSerializer(ReportDayTotal.sum_from_list(report_day_total))            
            return Response({'summary':serializer_summary.data,'total': serializer_total.data, 'top_menu': serializer_top_menu.data}, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_200_OK)

class CallQueueAPIView(APIView):
    permission_classes = [IsAuthenticated, IsSupplier]

    def post(self, request):
        supplier = request.user.get_supplier()
        queue = Queue.objects.get(queue_number=request.data['queue_number'], order__supplier=supplier)
        if queue.order.category == Order.ONLINE:
            notification_list = queue.order.customer.get_notification()
            for notification in notification_list:
                notification.send_notification(
                    message='Your order is already done, come grab it!',
                    title=supplier.name+' - '+queue.queue_number,
                    data={'status':100})
        return Response(status=status.HTTP_200_OK)
