from rest_framework.permissions import BasePermission

class IsCustomer(BasePermission):

    def has_permission(self, request, view):
        return request.user and request.user.is_customer

class IsSupplier(BasePermission):

    def has_permission(self, request, view):
        return request.user and request.user.is_supplier

