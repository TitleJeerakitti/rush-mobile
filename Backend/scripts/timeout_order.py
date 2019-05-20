from supplier.models import Supplier
from order.models import Order,Queue
from report.models import *
import datetime
from datetime import  timedelta
from notification.models import Notification
def run():
    now = datetime.datetime.today() - timedelta(hours=3)
    supplier_list = Supplier.objects.all()
    order_list = Order.objects.filter(supplier__in=supplier_list,status=3,donetime__lte=now)
    for order in order_list:
        order.status = 6
        order.save()
        if order.customer.user != order.supplier.user:
            order.customer.user.is_banned = True
            order.customer.user.save()
        for notification in order.customer.get_notification():
            notification.send_notification(
                message='Your order is timeout',
                title='Your account was banned',
                data={'status':900})
            
    queue_list = Queue.objects.filter(order__in=order_list)
    for queue in queue_list:
        queue.status = 3 
        queue.save()
    print('Done!!!')
