from rest_framework import serializers

from .models import Customer
from account.models import User
from account.serializer import UserCustomerSerializer

class CustomerSerializer(serializers.ModelSerializer):
    user = UserCustomerSerializer(required=True)

    class Meta:
        model = Customer
        fields = ('user', 'birthday', 'tel_number')

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data)
        customer = Customer.objects.create(user=user,**validated_data)

class HomeCustomerSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField('get_user_name')
    email = serializers.SerializerMethodField('get_user_email')
    picture = serializers.SerializerMethodField('get_profile_picture')

    class Meta:
        model = Customer
        fields = ('name','email','birthday','picture')

    def get_user_name(self, obj):
        return obj.user.first_name+' '+obj.user.last_name
    
    def get_user_email(self, obj):
        return obj.user.email
    
    def get_profile_picture(self, obj):
        request = self.context.get('request')
        image_url = obj.profile_picture.url
        return request.build_absolute_uri(image_url)