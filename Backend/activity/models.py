from django.db import models
from account.models import User
from supplier.models import Supplier
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation


class Activity(models.Model):
    ACTION = (
        (100, 'Login - App'),
        (101, 'Login - App Facebook'),

        (200, 'SignUp Customer - App'),
        (201, 'SignUp Customer - App Facebook'),
        (202, 'SighUp Supplier - App'),

        (300, 'Logout - App'),

        (500, 'View Supplier - Nearest'),
        (501, 'View Supplier - Category'),
        (502, 'View Supplier - Popular'),

        (600, 'Pay Success - App'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    action = models.IntegerField(choices=ACTION)
    msg = models.CharField(max_length=120, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True, db_index=True)
    content_type = models.ForeignKey(
        ContentType, on_delete=models.CASCADE, null=True)
    object_id = models.PositiveIntegerField(null=True)
    content_object = GenericForeignKey()

    class Meta:
        ordering = ['-timestamp']

    def __str__(self):
        return self.user.username+' '+str(self.action)

    @staticmethod
    def push(user, action, msg=''):
        activity = Activity.objects.create(user=user,
                                           action=action,
                                           msg=msg)


class ViewActivity(models.Model):
    view = GenericRelation(Activity, related_query_name='view_activities')
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE)

    @staticmethod
    def push(user, supplier, action, msg=''):
        view_activity = ViewActivity.objects.create(supplier=supplier)
        activity = Activity.objects.create(user=user,
                                           action=action,
                                           msg=msg,
                                           content_object=view_activity)


class PaySuccess(models.Model):
    pay = GenericRelation(Activity, related_query_name='pay_activities')
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE)

    @staticmethod
    def push(user, supplier, action, msg=''):
        pay_activity = PaySuccess.objects.create(supplier=supplier)
        activity = Activity.objects.create(user=user,
                                           action=action,
                                           msg=msg,
                                           content_object=pay_activity)
