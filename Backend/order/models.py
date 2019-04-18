from django.db import models
from django.http import HttpResponse
import datetime

from customer.models import Customer
from supplier.models import Supplier, Menu, SupplierQueueIndex
# Create your models here.


class Order(models.Model):
    DEFAULT = 0
    WAITING = 1
    COOKING = 2
    DONE = 3
    CANCEL = 4
    SUCCESS = 5
    TIMEOUT = 6

    STATUS_CHOICE = (
        (DEFAULT, 'Default'),
        (WAITING, 'Waiting'),
        (COOKING, 'Cooking'),
        (DONE, 'Done'),
        (CANCEL, 'Cancel'),
        (SUCCESS, 'Success'),
        (TIMEOUT, 'Timeout'),
    )

    ONLINE = 'R'
    WALKIN = 'A'

    CATEGORY_CHOICE = (
        (WALKIN, 'Walk in'),
        (ONLINE, 'Online')
    )

    id = models.AutoField(primary_key=True)
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    status = models.IntegerField(default=0, choices=STATUS_CHOICE)
    total = models.FloatField(null=True, default=None)
    special_request = models.CharField(blank=True, max_length=250)
    estimate_time = models.IntegerField(default=0)
    timestamp = models.DateTimeField(auto_now_add=True, blank=True)
    discount = models.FloatField(default=0.0)
    category = models.CharField(
        choices=CATEGORY_CHOICE, default=ONLINE, max_length=1)
    donetime = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return str(self.id) + ' order by ' + str(self.customer) + ' -- ' + str(self.supplier)

    def create_online_order(self, customer_id, supplier_id, total, special_request, discount, menus, category):
        customer = Customer.objects.get(user__id=customer_id)
        supplier = Supplier.objects.get(user__id=supplier_id)
        order = Order.objects.create(customer=customer, supplier=supplier, total=total,
                                     special_request=special_request, discount=discount, status=1, category=Order.ONLINE)
        order.save()
        order_menu = []
        for menu in menus:
            order_menu.append(OrderMenu.create_order_menu(
                order, menu['menu_id'], menu['amount']))
        return order

    @staticmethod
    def create_offline_order(user, total, special_request, discount, menus):
        order = Order.objects.create(customer=user.get_customer(),
                                     supplier=user.get_supplier(),
                                     total=total,
                                     special_request=special_request,
                                     discount=discount,
                                     status=2,
                                     category=Order.WALKIN,
                                     )
        order.save()
        order_menu = []
        for menu in menus:
            order_menu.append(OrderMenu.create_order_menu(
                order, menu['menu_id'], menu['amount']))
        return order

    def get_timestamp(self):
        return self.timestamp.strftime("%H:%M %d-%B-%Y")

    def get_order_id(self):
        return '{0:08}'.format(self.id)

    def get_customer_id(self):
        return '{0:08}'.format(self.customer.user.id)

    def cancel_order(self):
        self.status = 4
        queue = Queue.objects.get(order=self)
        queue.cancel_queue()
        self.save()

    def get_order_date(self):
        return self.timestamp.strftime("%d-%m-%Y")

    def get_order_time(self):
        return self.timestamp.strftime("%H:%M")

    def update_status(self, status):
        from activity.models import PaySuccess,Activity
        queue = Queue.objects.get(order=self)
        if status == 3:
            queue.update_status(2)
        elif status == 4 or status == 6:
            queue.update_status(3)
        elif status == 5:
            queue.update_status(4)
            PaySuccess.push(user=self.customer.user,
                            supplier=self.supplier,
                            action=600,
                            msg=''
            )
        self.donetime = datetime.datetime.now()
        self.status = status
        self.save()


class OrderMenu(models.Model):
    id = models.AutoField(primary_key=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE)
    amount = models.IntegerField(default=0)

    def __str__(self):
        return '{0:08}'.format(self.id)

    @staticmethod
    def create_order_menu(order, menu_id, amount):
        menu = Menu.objects.get(id=menu_id)
        order_menu = OrderMenu.objects.create(
            order=order, menu=menu, amount=amount)
        order_menu.save()
        return order_menu


class Queue(models.Model):
    DEFAULT = 0
    INPROCESS = 1
    DONE = 2
    CANCEL = 3
    SUCCESS = 4

    STATUS_CHOICE = (
        (DEFAULT, 'Default'),
        (INPROCESS, 'Inprocess'),
        (DONE, 'DONE'),
        (CANCEL, 'CANCEL'),
        (SUCCESS, 'SUCCESS')
    )
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    status = models.IntegerField(choices=STATUS_CHOICE, default=0)
    timestamp = models.DateTimeField(auto_now_add=True)
    queue_number = models.CharField(default='A000', max_length=8)
    donetime = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.order.get_order_id()+' '+self.queue_number

    def get_timestamp(self):
        return self.timestamp.strftime("%H:%M %d-%B-%Y")

    @staticmethod
    def create_queue(order):

        supplier_queue, create = SupplierQueueIndex.objects.get_or_create(
            supplier=order.supplier, category=order.category)
        supplier_queue.save()
        queue = Queue.objects.create(
            order=order, queue_number=supplier_queue.new_queue(), status=1)
        queue.save()
        return queue.queue_number

    def cancel_queue(self):
        self.status = 3
        self.save()

    def update_status(self, status):
        self.status = status
        self.donetime = datetime.datetime.now()
        self.save()
