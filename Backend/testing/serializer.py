from rest_framework import serializers
from testing.models import Restaurant

class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ('id','name','rating','reviewCount','category','isOpen','distance','image',)