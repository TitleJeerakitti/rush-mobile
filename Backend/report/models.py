from django.db import models

# Create your models here.
from supplier.models import Menu, Supplier
import collections

class ReportDayTotal(models.Model):
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True, blank=True)
    total = models.FloatField(default=0)
    order_success = models.IntegerField(default=0)
    order_fail = models.IntegerField(default=0)

    def __str__(self):
        return self.supplier.name + '  ' + self.timestamp.strftime("%d-%B-%Y")

    def get_all_order(self):
        return self.order_fail+self.order_success

    def get_timestamp(self):
        return self.timestamp.strftime("%d-%B-%Y")

    @staticmethod
    def calculate(supplier, time):
        from order.models import Order
        import datetime
        try:
            ReportDayTotal.objects.get(supplier=supplier,
                                       timestamp__year=time.year, timestamp__month=time.month, timestamp__day=time.day)
        except:
            order_success = Order.objects.filter(supplier=supplier,
                                                 status=Order.SUCCESS, timestamp__year=time.year,
                                                 timestamp__month=time.month, timestamp__day=time.day)
            order_fail = Order.objects.filter(supplier=supplier, status=Order.CANCEL, timestamp__year=time.year,
                                              timestamp__month=time.month, timestamp__day=time.day) and Order.objects.filter(
                supplier=supplier, status=Order.TIMEOUT, timestamp__year=time.year, timestamp__month=time.month, timestamp__day=time.day)
            total = 0
            for order in order_success:
                total += order.total

            report = ReportDayTotal.objects.create(
                supplier=supplier,
                total=total,
                order_success=order_success.count(),
                order_fail=order_fail.count(),
            )
            return 'Done!!'
        return 'Already have in database'


class ReportDayMenu(models.Model):
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE)
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE)
    amount = models.IntegerField(default=0)
    timestamp = models.DateTimeField(auto_now_add=True, blank=True)

    def __str__(self):
        return str(self.menu)+'  ' + self.timestamp.strftime("%d-%B-%Y")

    def get_timestamp(self):
        return self.timestamp.strftime("%d-%B-%Y")

    @staticmethod
    def calculate(supplier, time):
        from order.models import Order, OrderMenu
        if ReportDayMenu.objects.filter(supplier=supplier, timestamp__year=time.year, timestamp__month=time.month, timestamp__day=time.day):
            return 'Already have in database'
        order_list = Order.objects.filter(supplier=supplier, status=Order.SUCCESS,
                                          timestamp__year=time.year, timestamp__month=time.month,
                                          timestamp__day=time.day)
        menu_calculated = {}
        for order in order_list:
            order_menu_list = OrderMenu.objects.filter(order=order)
            for order_menu in order_menu_list:
                if str(order_menu.menu.id) in menu_calculated:
                    menu_calculated[str(order_menu.menu.id)] += 1
                else:
                    menu_calculated[str(order_menu.menu.id)] = 1
        for key in menu_calculated:
            ReportDayMenu.objects.create(
                supplier=supplier,
                menu=Menu.objects.get(id=int(key)),
                amount=int(menu_calculated[key]),
            )
        return 'Done!!'

    @staticmethod
    def get_top_menu_list(supplier,report_day_list):
        sum_list = {}
        for report in report_day_list:
            if report.menu.id not in sum_list:
                sum_list[report.menu.id] = report.amount
            else:
                sum_list[report.menu.id] += report.amount

        ReportTuple = collections.namedtuple('id_list', 'count id')
        report_list = sorted([ReportTuple(v, k) for (k, v) in sum_list.items()],
                           reverse=True)
        item_list = []
        for report in report_list:
            item_list.append(ReportDayMenuSum(menu=Menu.objects.get(id=report.id),amount=report.count))
        return item_list

class ReportDayMenuSum(object):
    def __init__(self,menu,amount):
        self.amount = amount
        self.id = menu.id
        self.name = menu.name
        self.image = menu.image