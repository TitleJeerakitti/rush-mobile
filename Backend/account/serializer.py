from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from .models import User


class UserCustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name',
                  'email',)
        extra_kwargs = {'password': {'write_only': True}}


class UserSupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email',
                  'is_customer', 'is_supplier',)
        extra_kwargs = {'password': {'write_only': True}}

