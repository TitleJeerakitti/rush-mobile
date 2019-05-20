from rest_framework.permissions import BasePermission

class IsCustomer(BasePermission):

    def has_permission(self, request, view):
        return request.user and request.user.is_customer and not request.user.is_banned

class IsSupplier(BasePermission):

    def has_permission(self, request, view):
        return request.user and request.user.is_supplier

