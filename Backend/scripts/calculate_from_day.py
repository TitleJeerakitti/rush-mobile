from supplier.models import Supplier
from report.models import *
import datetime

def run(*script_args):
    supplier_list = Supplier.objects.all()
    date = datetime.datetime.today() - datetime.timedelta(days=int(script_args[0]))
    while date.date() != datetime.datetime.today().date() + datetime.timedelta(days=1):
        for supplier in supplier_list:
            status_menu = ReportDayMenu.calculate(supplier,date)
            print(supplier.name + ' report_day_menu ' + status_menu)
            status_total = ReportDayTotal.calculate(supplier,date)
            print(supplier.name + ' report_day_total ' + status_total)
        print('Done!!!' + str(date))
        date += datetime.timedelta(days=1)
