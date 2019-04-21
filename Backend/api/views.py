from django.shortcuts import render
from django.utils.timezone import datetime
from datetime import timedelta

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from account.permission import IsCustomer, IsSupplier
from supplier.models import Category, Supplier, MainCategory
from supplier.serializer import SupplierCardSerializers, MainCategoriesSerializer
from promotion.models import Promotion
from activity.views import restaurant_suggestion_list
from order.models import Order, Queue
from order.serializer import OrderManagementSerializer, OrderRestaurantDetailSerializer, QueueManagementSerializer
from report.models import *
from .serializers import *
from report.serializers import *


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

#     def get(self, request):

#         from supplier.models import Supplier
#         try:
#             latitude = request.GET['latitude']
#             longitude = request.GET['longitude']
#         except:
#             return Response(status.HTTP_400_BAD_REQUEST)
#         supplier_list = Supplier.objects.all()
#         user_location = Point(float(longitude),float(latitude),srid=4326)
#         pnt = GEOSGeometry(user_location)

#         for supplier in supplier_list:
#             distance = supplier.distance_from_location(user_location)
#             if distance > 20:
#                 supplier_list = supplier_list.exclude(user=supplier.user)
#         supplier_sorted = sorted(supplier_list,key=lambda t:t.distance_from_location(user_location))
#         # supplier = Supplier.objects.filter(user__is_supplier=True,latitude__range=(latitude_l,latitude_h),longitude__range=(longitude_l,longitude_h))
#         # serializers = SupplierCardSerializers(
        #     supplier, many=True, context={'request': request})
        # return Response(serializers.data)


class RestaurantHomeAPIView(APIView):
    permission_classes = [IsAuthenticated, IsSupplier]

    def get(self, request):
        supplier = request.user.get_supplier()
        main_category = MainCategory.objects.filter(
            supplier=supplier, is_display=True)
        serializers = MainCategoriesSerializer(
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
                supplier=supplier, timestamp__range=[start_time, end_time])
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
                supplier=supplier, timestamp__month=time.month, timestamp__year=time.year)
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
            serializer_total = ReportDayTotalSerializer(
                report_day_total, many=True)
            report_day_menu = ReportDayMenu.get_top_menu_list(
                supplier, ReportDayMenu.objects.filter(supplier=supplier, timestamp__year=time.year))
            serializer_top_menu = ReportDayMenuSumSerializer(
                report_day_menu, many=True, context={'request': request})
            serializer_summary = ReportDayTotalSumSerializer(ReportDayTotal.sum_from_list(report_day_total))            
            return Response({'summary':serializer_summary.data,'total': serializer_total.data, 'top_menu': serializer_top_menu.data}, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_200_OK)
