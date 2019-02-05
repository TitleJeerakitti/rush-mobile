from rest_framework import serializers

from .models import *
from account.models import User
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


class SupplierNearbySerializer(serializers.ModelSerializer):
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
    quantity = serializers.IntegerField(default=0)

    class Meta:
        model = Menu
        fields = ('id', 'name', 'price', 'picture', 'quantity', )

    def get_image_url(self, obj):
        request = self.context.get('request')
        image_url = obj.image.url
        return request.build_absolute_uri(image_url)


class SubCategoriesSerializer(serializers.ModelSerializer):
    menus = serializers.SerializerMethodField('get_menu')

    class Meta:
        model = SubCategory
        fields = ('name', 'menus')

    def get_menu(self, obj):
        request = self.context.get('request')
        menus = Menu.objects.filter(
            supplier=obj.supplier, sub_category=obj)
        menus_serializer = MenusSerializers(
            menus, many=True, context={'request': request})
        return menus_serializer.data


class MainCategoriesSerializer(serializers.ModelSerializer):
    sub_categories = serializers.SerializerMethodField('get_sub_category')

    class Meta:
        model = MainCategory
        fields = ('name', 'sub_categories', )

    def get_sub_category(self, obj):
        request = self.context.get('request')
        sub_category = SubCategory.objects.filter(
            supplier=obj.supplier, main_category=obj)
        sub_category_serializer = SubCategoriesSerializer(
            sub_category, many=True, context={'request': request})
        return sub_category_serializer.data


class RestaurantDetailSerializer(serializers.ModelSerializer):
    extra_pictures = serializers.SerializerMethodField('get_extra_picture')
    estimate_time = serializers.IntegerField(default=20)
    main_categories = serializers.SerializerMethodField('get_main_category')

    class Meta:
        model = ExtraPicture
        fields = ('extra_pictures', 'estimate_time', 'main_categories')

    def get_extra_picture(self, obj):
        request = self.context.get('request')
        picture = ExtraPicture.objects.filter(supplier=obj)
        picture_serializer = ExtraPictureSerializer(
            picture, many=True, context={'request': request})
        return picture_serializer.data

    def get_main_category(self, obj):
        request = self.context.get('request')
        main_categories = MainCategory.objects.filter(supplier=obj)
        main_categories_serializer = MainCategoriesSerializer(
            main_categories, many=True, context={'request': request})
        return main_categories_serializer.data
