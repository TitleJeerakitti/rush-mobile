from rest_framework import parsers, renderers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.compat import coreapi, coreschema
from rest_framework.schemas import ManualSchema

from .models import User
from customer.models import Customer
from customer.serializer import HomeCustomerSerializer

class LoginUserAPIView(APIView):
    throttle_classes = ()
    permission_classes = ()
    parser_classes = (parsers.FormParser, parsers.MultiPartParser, parsers.JSONParser,)
    renderer_classes = (renderers.JSONRenderer,)
    serializer_class = AuthTokenSerializer
    if coreapi is not None and coreschema is not None:
        schema = ManualSchema(
            fields=[
                coreapi.Field(
                    name="username",
                    required=True,
                    location='form',
                    schema=coreschema.String(
                        title="Username",
                        description="Valid username for authentication",
                    ),
                ),
                coreapi.Field(
                    name="password",
                    required=True,
                    location='form',
                    schema=coreschema.String(
                        title="Password",
                        description="Valid password for authentication",
                    ),
                ),
            ],
            encoding="application/json",
        )

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        user_model = User.objects.get(username=user.username)
        user_status = 'admin'
        if user_model.is_customer :
            user_status = 'customer'
            customer = Customer.objects.get(user=user_model)
            serializers = HomeCustomerSerializer(customer,context={'request':request})  
            token, created = Token.objects.get_or_create(user=user)
            return Response({'user_info': serializers.data,'token': token.key,'role':user_status})
        elif user_model.is_supplier :
            user_status = 'supplier'
            token, created = Token.objects.get_or_create(user=user)
            return Response({'user_info': None,'token': token.key,'role':user_status})
        return Response({'user_info': None,'token': None,'role':user_status})

class LogoutUserAPIView(APIView):
    queryset = User.objects.all()

    def get(self, request, format=None):
        # simply delete the token to force a login
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)

