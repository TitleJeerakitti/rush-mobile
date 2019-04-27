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
    
    SupplierTuple = collections.namedtuple('id_list', 'count id')
    supplier_list = sorted([SupplierTuple(v, k) for (k, v) in supplier_list.items()],
                           reverse=True)
    id_list = []
    for supplier in supplier_list:
        id_list.append(supplier.id)

    clauses = ' '.join(['WHEN user_id=%s THEN %s' % (pk, i) for i, pk in enumerate(id_list)])
    ordering = 'CASE %s END' % clauses
    supplier = Supplier.objects.filter(pk__in=id_list,is_open=True).extra(
           select={'ordering': ordering}, order_by=('ordering',))
    return supplier


def type_activity_list(user, action):
    activity = Activity.objects.filter(user=user, action=action)
    return activity
