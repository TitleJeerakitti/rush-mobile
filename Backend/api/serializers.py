from rest_framework import serializers

from promotion.models import Promotion
from supplier.models import Category

class SlideBannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Promotion
        fields = ('id','image',)

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id','name','image')
