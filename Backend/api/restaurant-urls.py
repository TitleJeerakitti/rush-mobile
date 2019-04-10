from django.urls import path

from account.views import *
from api.views import *
from supplier.views import CreateEditMenu,CreateEditSubCategoryAPIView,CreateEditMainCategoryAPIView

urlpatterns = [
    path('login/', LoginRestuarantUserTokenView.as_view()),
    path('logout/', LogoutUserRevokeTokenView.as_view()),
    path('reset-password/', ResetPasswordAPIVIew.as_view()),
    path('home/', RestaurantHomeAPIView.as_view()),
    path('get-supplier-data/', GetSupplierData.as_view()),
    path('get-order-management/', RestaurantOrderAPIView.as_view()),
    path('create-edit-menu/', CreateEditMenu.as_view()),
    path('create-edit-sub-category/',CreateEditSubCategoryAPIView.as_view()),
    path('create-edit-main-category/',CreateEditMainCategoryAPIView.as_view())
]
