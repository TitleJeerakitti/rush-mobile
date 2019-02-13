from rest_framework.response import Response
from rest_framework import serializers

from .models import Review
from customer.models import Customer


class CustomerReviewSerializer(serializers.ModelSerializer):
    picture = serializers.ImageField(source='profile_picture')
    name = serializers.CharField(source='get_name')

    class Meta:
        model = Customer
        fields = ('name', 'picture')


class ReviewSerializer(serializers.ModelSerializer):
    rating = serializers.FloatField(source='rate')
    customer_detail = CustomerReviewSerializer(source='customer')
    timestamp = serializers.SerializerMethodField('get_date_timestamp')

    class Meta:
        model = Review
        fields = ('customer_detail', 'comment', 'rating', 'timestamp')

    def get_date_timestamp(self, obj):
        return obj.get_timestamp()

class GetReviewSerializer(serializers.Serializer):
    customer_id = serializers.IntegerField()
    supplier_id = serializers.IntegerField()

    def get_method(self, validate_data, request):
        review = Review.objects.filter(supplier__user__id=validate_data['supplier_id'])
        serializers = ReviewSerializer(review, many=True,context={'request':request})
        try:
            Review.objects.get(supplier__user__id=validate_data['supplier_id'],customer__user__id=validate_data['customer_id'])
        except:
            return {'can_review':True,'reviews':serializers.data}
        return {'can_review':False,'reviews':serializers.data}