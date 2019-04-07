from rest_framework.response import Response
from rest_framework import serializers, status

from .models import Review
from customer.models import Customer
from supplier.models import Supplier


class ReviewDetailSerializer(serializers.ModelSerializer):
    supplier_id = serializers.IntegerField()
    rate = serializers.FloatField(required=True)

    class Meta:
        model = Review
        fields = ('supplier_id', 'rate', 'comment',)

    # def create(self, validated_data, request):
    #     customer = Customer.objects.get(user=request.user)
    #     supplier_id = validated_data['supplier_id']
    #     supplier = Supplier.objects.get(user__id=supplier_id)
    #     try:
    #         Review.objects.get(supplier=supplier,customer=customer)
    #         return Response({'error':'This user already review'},status=status.HTTP_406_NOT_ACCEPTABLE)
    #     except:
    #         review = Review.objects.create(customer=customer, supplier=supplier,
    #                                     rate=validated_data['rate'], comment=validated_data['comment'])
    #     return Response({'success':'successful create review'},status=status.HTTP_200_OK)


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

    def get_method(self, validated_data, request):
        review = Review.objects.filter(
            supplier__user__id=validated_data['supplier_id']).order_by('timestamp')
        serializers = ReviewSerializer(
            review, many=True, context={'request': request})
        try:
            Review.objects.get(
                supplier__user__id=validated_data['supplier_id'], customer__user__id=validated_data['customer_id'])
        except:
            return {'can_review': True, 'reviews': serializers.data}
        return {'can_review': False, 'reviews': serializers.data}
