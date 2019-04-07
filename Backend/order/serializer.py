from rest_framework import serializers
from rest_framework.response import Response
from rest_framework import status

from supplier.models import Menu
from supplier.serializer import SupplierCardSerializers, MenusSerializers
from promotion.models import PromotionUsage, Promotion
from .models import *


class ConfirmOrderSerializer(serializers.Serializer):
    total = serializers.FloatField()
    promotion_code = serializers.CharField(max_length=8)
    supplier_id = serializers.IntegerField()

    def check_can_used(self, validated_data, customer):
        if not(self.check_exist(validated_data['promotion_code'])):
            return Response({"status": 600}, status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)
        elif not(self.is_include_restaurant(validated_data=validated_data)):
            return Response({"status": 603}, status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)
        elif self.check_used(validated_data['promotion_code'], customer):
            return Response({"status": 601}, status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)
        elif not(self.pass_condition(validated_data=validated_data)):
            return Response({"status": 602}, status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)
        return self.discount(validated_data=validated_data)

    def discount(self, validated_data):
        promotion = Promotion.objects.get(
            promotion_code=validated_data['promotion_code'])
        total = float(validated_data['total'])
        if promotion.discount_percent == 0:
            total = total - promotion.discount_price
            discount_price = promotion.discount_price
        else:
            discount_price = total*promotion.discount_percent/100
            total = total - discount_price
        return Response({"status": 200, "total": total, "discount_price": discount_price}, status=status.HTTP_200_OK)

    def check_exist(self, promotion_code):
        try:
            Promotion.objects.get(promotion_code=promotion_code)
        except:
            return False
        return True

    def check_used(self, promotion_code, customer):
        return PromotionUsage.check_used(self, promotion_code, customer)

    def pass_condition(self, validated_data):
        try:
            promotion = Promotion.objects.get(
                promotion_code=validated_data['promotion_code'])
        except:
            return False
        total = float(validated_data['total'])
        if total < promotion.minimum_price:
            return False

        return True

    def is_include_restaurant(self, validated_data):
        try:
            promotion = Promotion.objects.get(
                promotion_code=validated_data['promotion_code'], supplier__user__id=validated_data['supplier_id'])
        except:
            return False
        return True


class MenuSerializer(serializers.ModelSerializer):
    menu_id = serializers.IntegerField(source='id')
    amount = serializers.IntegerField()

    class Meta:
        model = Menu
        fields = ('menu_id', 'amount')


class CreateOrderSerializer(serializers.Serializer):
    supplier_id = serializers.IntegerField()
    promotion_code = serializers.CharField(allow_null=True)
    menus = MenuSerializer(many=True)
    total = serializers.FloatField()
    special_request = serializers.CharField(allow_blank=True)
    discount = serializers.FloatField()
    category = serializers.CharField()

    def create(self, validated_data, customer_id):
    
        promotion_code = validated_data.pop('promotion_code')
        order = Order.create_order(self, customer_id, **validated_data)
        queue = Queue.create_queue(self, order)
        if promotion_code:
            promotion = PromotionUsage.create_usage(
                self, order, promotion_code)
        return Response(status=status.HTTP_200_OK)


class OrderDetailSerializer(serializers.ModelSerializer):
    order_id = serializers.SerializerMethodField('get_order_id_format')
    timestamp = serializers.SerializerMethodField('get_date_timestamp')

    class Meta:
        model = Order
        fields = ('order_id', 'total', 'status', 'timestamp')

    def get_date_timestamp(self, obj):
        return obj.get_timestamp()

    def get_order_id_format(self, obj):
        return obj.get_order_id()


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
