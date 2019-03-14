import os
from rest_framework import serializers
from rest_framework import status
from rest_framework.response import Response

from account.serializer import UserCustomerSerializer
from supplier.models import Supplier
from supplier.serializer import SupplierCardSerializers
from order.models import Order
from order.serializer import OrderDetailSerializer
from activity.models import Activity

from .models import Customer, User

class CustomerSerializer(serializers.ModelSerializer):
    user = UserCustomerSerializer(required=True)

    class Meta:
        model = Customer
        fields = ('user', 'birthday', 'tel_number')

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data)
        user.is_customer = True
        user.save()
        Activity.push(user,200,user.username+' is register.')
        customer = Customer.objects.create(user=user, **validated_data)
        return Response(status=status.HTTP_200_OK)

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id',)


class HomeCustomerSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField('get_user_name')
    email = serializers.SerializerMethodField('get_user_email')
    picture = serializers.SerializerMethodField('get_profile_picture')
    id = serializers.SerializerMethodField('get_user_id')

    class Meta:
        model = Customer
        fields = ('id', 'name', 'email', 'birthday', 'picture', 'tel_number',)

    def get_user_name(self, obj):
        return obj.user.first_name+' '+obj.user.last_name

    def get_user_email(self, obj):
        return obj.user.email

    def get_user_id(self, obj):
        return obj.user.id

    def get_profile_picture(self, obj):
        request = self.context.get('request')
        image_url = obj.profile_picture.url
        if request:
            return request.build_absolute_uri(image_url)
        else:
            return image_url


class HistorydetailSerializer(serializers.Serializer):
    supplier_detail = SupplierCardSerializers(source='supplier')
    order_detail = serializers.SerializerMethodField('get_order')

    class Meta:
        model = Order
        fields = ('supplier_detail', 'order_detail')

    def get_order(self, obj):
        serializers = OrderDetailSerializer(obj)
        return serializers.data


class GetHistorySerializer(serializers.Serializer):

    def get_method(self, request):
        order = Order.objects.filter(
            customer__user=request.user, status=5) | Order.objects.filter(
            customer__user=request.user, status=4)
        order = order.order_by('-timestamp')
        serializers = HistorydetailSerializer(
            order, many=True, context={'request': request})
        return {'histories': serializers.data}
