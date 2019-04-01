from django.contrib.auth.forms import PasswordResetForm

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import ParseError
from rest_framework import status
from rest_framework_social_oauth2.views import TokenView, RevokeTokenView, ConvertTokenView
from oauth2_provider.models import AccessToken

from .models import User
from customer.models import Customer
from customer.serializer import HomeCustomerSerializer, CustomerSerializer
from activity.models import Activity

class LoginUserTokenView(TokenView):

    def post(self, request, *args, **kwargs):
        response = super(LoginUserTokenView, self).post(request, *args, **kwargs)
        try:
            user = AccessToken.objects.get(
                token=response.data['access_token']).user
            user_status = 'admin'
            serializers = None
            if user.is_customer == True:
                user_status = 'customer'
                serializers = HomeCustomerSerializer(
                    user.get_customer(), context={'request': request}).data
            elif user.is_supplier == True:
                user_status = 'supplier'
            Activity.push(user,100,user.username+' log in as '+user_status+'.')
            return Response({
                'user_info': serializers,
                'token': response.data,
                'role': user_status
            }, status=status.HTTP_200_OK)
        except:
            return Response(response.data)


class LogoutUserRevokeTokenView(RevokeTokenView):

    def post(self, request, *args, **kwargs):
        Activity.push(request.user,300,request.user.username+'log out.')
        response = super(LogoutUserRevokeTokenView, self).post(
            request, *args, **kwargs)
        return Response(response.data)


class LoginFacebookConvertTokenView(ConvertTokenView):

    def post(self, request, *args, **kwargs):
        response = super(LoginFacebookConvertTokenView, self).post(
            request, *args, **kwargs)
        try:
            user = AccessToken.objects.get(
                token=response.data['access_token']).user
            serializers = HomeCustomerSerializer(
                user.get_customer(), context={'request': request}).data
            return Response({
                'user_info': serializers,
                'token': response.data,
                'role': 'customer'
            }, status=status.HTTP_200_OK)
        except:
            return Response(response.data)


class RegisterCustomerAPIView(APIView):
    permission_classes = ()

    def post(self, request):
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid(raise_exception=ValueError):
            serializer.create(validated_data=request.data)
            return Response(serializer.validated_data, status=status.HTTP_201_CREATED)
        return Response(serializer.error_messages,
                        status=status.HTTP_400_BAD_REQUEST)


class UploadCustomerProfileAPIView(APIView):

    def post(self, request):
        customer = Customer.objects.get(user=request.user)
        try:
            image = request.data['profile_picture']
        except KeyError:
            raise ParseError('Request has no resource file attached')
        customer.profile_picture.save(image.name, image, save=True)
        return Response(status=status.HTTP_200_OK)


class ResetPasswordAPIVIew(APIView):
    permission_classes = ()

    def post(self, request):
        try:
            email = request.data['email']
            
        except KeyError:
            raise ParseError('Request has no email')
        form = PasswordResetForm({'email': email})
        if form.is_valid():
            form.save(request=request, email_template_name='registration/password_reset_email.html')
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)
