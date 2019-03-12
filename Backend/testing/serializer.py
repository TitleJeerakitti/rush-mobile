from rest_framework import serializers
from testing.models import Restaurant,Testing

class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ('id','name','rating','reviewCount','category','isOpen','distance','image',)


class TestingSerializer(serializers.ModelSerializer):
    date_time = serializers.SerializerMethodField('get_format_date_time')
    class Meta :
        model = Testing
        fields = ('date_time',)

    def get_format_date_time(self, obj):
        return obj.get_date_time()