from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from account.permission import IsCustomer
from .models import Customer
from .serializer import CustomerSerializer,GetHistorySerializer

class CustomerRecordAPIView(APIView):
    permission_classes = ()

    def get(self, format=None):
        customer = Customer.objects.filter(user__is_customer=True)
        serializer = CustomerSerializer(customer, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid(raise_exception=ValueError):
            serializer.create(validated_data=request.data)
            return Response(serializer.validated_data, status=status.HTTP_201_CREATED)
        return Response(serializer.error_messages,
                        status=status.HTTP_400_BAD_REQUEST)

class CustomerHistoryAPIView(APIView):
    permission_classes= [IsAuthenticated,IsCustomer]
    
    def get(self, request):
        serializer = GetHistorySerializer()
        return Response(serializer.get_method(request=request))

