from supplier.models import Supplier
from report.models import *
import datetime

def run():
    today = datetime.datetime.today()
    supplier_list = Supplier.objects.all()
    for supplier in supplier_list:
        status_menu = ReportDayMenu.calculate(supplier,today)
        print(supplier.name + ' report_day_menu ' + status_menu)
        status_total = ReportDayTotal.calculate(supplier,today)
        print(supplier.name + ' report_day_total ' + status_total)
    print('Done!!!')
