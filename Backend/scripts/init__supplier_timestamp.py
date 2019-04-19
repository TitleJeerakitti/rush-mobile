from supplier.models import Supplier
from report.models import *

import datetime

def run():
    time = datetime.datetime.strptime('2017-04-05', '%Y-%m-%d')
    supplier_list = Supplier.objects.filter(user__id=1)
    for supplier in supplier_list:
        supplier.timestamp = time
        supplier.save()
    print('Done!!!')
