from django.urls import path

from account.views import *
from api.views import *
from supplier.views import *

urlpatterns = [
    path('login/', LoginRestuarantUserTokenView.as_view()),
    path('logout/', LogoutUserRevokeTokenView.as_view()),
    path('reset-password/', ResetPasswordAPIVIew.as_view()),
    path('home/', RestaurantHomeAPIView.as_view()),
    path('get-supplier-data/', GetSupplierData.as_view()),
    path('get-order-management/', RestaurantOrderAPIView.as_view()),
    path('create-edit-menu/', CreateEditMenu.as_view()),
    path('create-edit-sub-category/',CreateEditSubCategoryAPIView.as_view()),
    path('create-edit-main-category/',CreateEditMainCategoryAPIView.as_view()),
    path('create-offline-order/',RestaurantCreateOrderAPIView.as_view()),
    path('order-detail/',RestaurantOrderDetailAPIView.as_view()),
    path('update-order-status/',RestaurantUpdateOrderAPIView.as_view()),
    path('open-close-shop/',OpenOrCloseShopAPIView.as_view()),
    path('get-queue/',QueueManagementAPIView.as_view()),
    path('get-report/',ReportAPIView.as_view()),
]
