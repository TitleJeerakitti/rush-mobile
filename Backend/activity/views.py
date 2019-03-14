from django.shortcuts import render
from django.db.models import Q, Count

from datetime import datetime, timedelta

from supplier.models import Supplier
from .models import Activity
import collections

def restaurant_suggestion_list(user):
    limit = 4
    last_2_month = datetime.today() - timedelta(days=60)
    view_supplier_criterion = Q(
        user=user, action=500, timestamp__gte=last_2_month)
    pay_supplier_criterion = Q(
        user=user, action=600, timestamp__gte=last_2_month)

    activity_list = Activity.objects.filter(
        view_supplier_criterion | pay_supplier_criterion)
    supplier_list = {}
    for activity in activity_list:
        if activity.content_object.supplier.user.id not in supplier_list:
            supplier_list[activity.content_object.supplier.user.id] = 1
        else:
            supplier_list[activity.content_object.supplier.user.id] += 1

    SupplierTuple = collections.namedtuple('SupplierTuple', 'count id')
    supplier_list = sorted([SupplierTuple(v, k) for (k, v) in supplier_list.items()],
                           reverse=True)
    criterion = Q()
    count = 0
    for supplier in supplier_list:
        criterion = criterion | Q(user_id=supplier.id)
        count += 1
        if count == limit:
            break
    supplier = Supplier.objects.filter(criterion)
    # get supplier that popular 
    if count < limit:
        supplier_extend = Supplier.objects.all().exclude(criterion)[:limit-count]
        return supplier.union(supplier_extend,all=False)
    
    return supplier


def type_activity_list(user, action):
    activity = Activity.objects.filter(user=user, action=action)
    return activity
