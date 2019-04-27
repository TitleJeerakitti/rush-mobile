from supplier.models import SupplierQueueIndex
import datetime

def run():
    today = datetime.datetime.today()
    supplier_queue_list = SupplierQueueIndex.objects.all()
    for supplier in supplier_queue_list:
        supplier.reset_by_day()
        print(supplier.supplier.name + ' reset!! ')
    print('Done!!!')
