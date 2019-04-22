from rest_framework import serializers

from report.models import *


class ReportDayTotalSerializer(serializers.ModelSerializer):
    total_order = serializers.IntegerField(source='get_all_order')
    timestamp = serializers.CharField(source='get_timestamp')

    class Meta:
        model = ReportDayTotal
        fields = ('timestamp', 'total', 'total_order',
                  'order_success', 'order_fail')


class ReportDayMenuSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='menu.name')
    id = serializers.IntegerField(source='menu.id')
    image = serializers.ImageField(source='menu.image')

    class Meta:
        model = ReportDayMenu
        fields = ('amount', 'name', 'id', 'image')

class ReportDayMenuSumSerializer(serializers.Serializer):
    name = serializers.CharField()
    amount = serializers.IntegerField()
    id = serializers.IntegerField()
    image = serializers.ImageField()


class ReportDayTotalSumSerializer(serializers.Serializer):
    total = serializers.IntegerField()
    total_order = serializers.IntegerField()
    order_success = serializers.IntegerField()
    order_fail = serializers.IntegerField()


class ReportMonthTotalSumSerializer(serializers.Serializer):
    total = serializers.IntegerField()
    total_order = serializers.IntegerField()
    order_success = serializers.IntegerField()
    order_fail = serializers.IntegerField()
    month = serializers.CharField()