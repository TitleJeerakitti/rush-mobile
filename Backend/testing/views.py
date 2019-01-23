from django.http import JsonResponse,HttpResponse
from .models import Restaurant
from .serializer import RestaurantSerializer
from django.views.decorators.csrf import csrf_exempt


# Create your views here.
def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


def get_rest_list(request):
    if request.method == "GET":
        rest_list = Restaurant.objects.order_by('name')
        serializer = RestaurantSerializer(rest_list, many=True,context={"request": request})
        return JsonResponse(serializer.data, safe=False)

