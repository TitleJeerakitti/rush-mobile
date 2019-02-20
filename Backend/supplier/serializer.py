from django.shortcuts import get_object_or_404

from rest_framework import serializers

from .models import *
from order.models import Order,OrderMenu
from customer.models import User
from account.serializer import UserSupplierSerializer


class SupplierSerializer(serializers.ModelSerializer):
    user = UserSupplierSerializer(required=True)

    class Meta:
        model = Supplier
        fields = ('user',  'name', 'profile_picture', 'banner_picture',
                  'address', 'description', 'isOpen', 'category')

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data)
        supplier = Supplier.objects.create(user=user, **validated_data)


class SupplierCardSerializers(serializers.ModelSerializer):
    id = serializers.SerializerMethodField('get_supplier_id')
    rating = serializers.FloatField(default=5.0)
    reviewCount = serializers.IntegerField(default=500)
    distance = serializers.IntegerField(default=1000)
    image = serializers.SerializerMethodField('get_profile_picture')

    class Meta:
        model = Supplier
        fields = ('id', 'name', 'rating', 'reviewCount',
                  'category', 'isOpen', 'distance', 'image')

    def get_supplier_id(self, obj):
        return obj.user.id

    def get_profile_picture(self, obj):
        request = self.context.get('request')
        image_url = obj.profile_picture.url
        return request.build_absolute_uri(image_url)


class ExtraPictureSerializer(serializers.ModelSerializer):

    class Meta:
        model = ExtraPicture
        fields = ('image',)


class MenusSerializers(serializers.ModelSerializer):
    picture = serializers.SerializerMethodField('get_image_url')
    quantity = serializers.SerializerMethodField('get_amount_history')

    class Meta:
        model = Menu
        fields = ('id', 'name', 'price', 'picture', 'quantity', )

    def get_image_url(self, obj):
        request = self.context.get('request')
        image_url = obj.image.url
        return request.build_absolute_uri(image_url)

    def get_amount_history(self, obj):
        if self.context.get('order_id'):
            order = get_object_or_404(Order,id=self.context.get('order_id'))
            order_menu_obj = OrderMenu.objects.filter(order=order)
            for order_menu in order_menu_obj:
                if obj == order_menu.menu:
                    return order_menu.amount
        return 0


class SubCategoriesSerializer(serializers.ModelSerializer):
    menus = MenusSerializers(source='menu_set',many=True)

    class Meta:
        model = SubCategory
        fields = ('name', 'menus')


class MainCategoriesSerializer(serializers.ModelSerializer):
    # sub_categories = serializers.SerializerMethodField('get_sub_category')
    sub_categories = SubCategoriesSerializer(source='subcategory_set',many=True)
    class Meta:
        model = MainCategory
        fields = ('name', 'sub_categories', )


class RestaurantDetailSerializer(serializers.ModelSerializer):
    # extra_pictures = serializers.SerializerMethodField('get_extra_picture')
    extra_pictures = ExtraPictureSerializer(source='extrapicture_set',many=True)
    estimate_time = serializers.IntegerField(default=20)
    main_categories = MainCategoriesSerializer(
        source='main_category', many=True)

    class Meta:
        model = Supplier
        fields = ('extra_pictures', 'estimate_time', 'main_categories')