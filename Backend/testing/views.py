from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from .models import Restaurant, Testing
from .serializer import RestaurantSerializer, TestingSerializer
from django.views.decorators.csrf import csrf_exempt
import datetime
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView


# Create your views here.
def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


def get_rest_list(request):
    if request.method == "GET":
        rest_list = Restaurant.objects.order_by('name')
        serializer = RestaurantSerializer(
            rest_list, many=True, context={"request": request})
        return JsonResponse(serializer.data, safe=False)


class TestingApiView(APIView):
        permission_classes = [AllowAny]

        def get(self, format=None):
                date_time = Testing.objects.all()
                serializer = TestingSerializer(date_time, many=True)
                return Response(serializer.data)

        