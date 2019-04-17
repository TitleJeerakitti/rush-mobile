from django.db import models

# # Create your models here.
# class ReportDayTotal(models.Model):
#     timestamp = models.DateTimeField(auto_now_add=True, blank=True)
#     total = models.FloatField(default=0)
#     order_success = models.IntegerField(default=0)
#     order_fail = models.IntegerField(default=0)

#     def get_all_order(self):
#         return self.order_fail+self.order_success

#     @staticmethod
#     def calculate_today(supplier):
#         from order.models import Order
#         order_success = Order.objects.filter(status=5)
#         order_fail = 
#         report = ReportDayTotal.objects.create(
#             total = total,
#             order_success = order_success,
#             order_cancel = order_cancel,
#         )
# class ReportDayMenu(models.Model):
#     pass