from rest_framework import serializers
from rest_framework.response import Response
from rest_framework import status

from supplier.models import Menu
from supplier.serializer import SupplierCardSerializers, MenusSerializers
from .models import *


class MenuSerializer(serializers.ModelSerializer):
    menu_id = serializers.IntegerField(source='id')
    amount = serializers.IntegerField()

    class Meta:
        model = Menu
        fields = ('menu_id', 'amount')


class CreateOrderSerializer(serializers.Serializer):
    customer_id = serializers.IntegerField()
    supplier_id = serializers.IntegerField()
    menus = MenuSerializer(many=True)
    total = serializers.FloatField()
    special_request = serializers.CharField(allow_blank=True)
    discount = serializers.FloatField()

    def create(self, validated_data):
        order = Order.create_order(self, **validated_data)
        queue = Queue.create_queue(self, order)
        return Response(status=status.HTTP_200_OK)


class OrderDetailSerializer(serializers.ModelSerializer):
    order_id = serializers.IntegerField(source='id')
    timestamp = serializers.SerializerMethodField('get_date_timestamp')

    class Meta:
        model = Order
        fields = ('order_id', 'total', 'status', 'timestamp')

    def get_date_timestamp(self, obj):
        return obj.get_timestamp()


class QueueDetailSerializer(serializers.ModelSerializer):
    # supplier_detail = serializers.SerializerMethodField('get_supplier_detail')
    supplier_detail = SupplierCardSerializers(source='order.supplier')
    order_detail = OrderDetailSerializer(source='order')
    queue_id = serializers.IntegerField(source='id')

    class Meta:
        model = Queue
        fields = ('supplier_detail', 'order_detail',
                  'queue_id', 'queue_number')

    def get_supplier_detail(self, obj):
        request = self.context.get('request')
        serializers = SupplierCardSerializers(
            obj.order.supplier, context={'request': request})
        return serializers.data


class OrderMenuSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='menu.id')
    name = serializers.CharField(source='menu.name')
    price = serializers.FloatField(source='menu.price')
    picture = serializers.SerializerMethodField('get_image_url')
    quantity = serializers.IntegerField(source='amount')

    class Meta:
        model = OrderMenu
        fields = ('id', 'name', 'price', 'picture', 'quantity')

    def get_image_url(self, obj):
        request = self.context.get('request')
        image_url = obj.menu.image.url
        return request.build_absolute_uri(image_url)


class OrderReceiptSerializer(serializers.ModelSerializer):
    supplier_detail = SupplierCardSerializers(source='supplier')
    menus = OrderMenuSerializer(source='ordermenu_set', many=True)

    class Meta:
        model = Order
        fields = ('supplier_detail', 'menus', 'total')
