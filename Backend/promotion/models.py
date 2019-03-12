from django.db import models
from supplier.models import Supplier
from order.models import Order


class Promotion(models.Model):
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE)
    name = models.CharField(max_length=250)
    image = models.ImageField(upload_to='promotion')
    promotion_code = models.CharField(max_length=5)
    description = models.CharField(max_length=250, blank=True)
    minimum_price = models.FloatField(default=0)
    discount_price = models.FloatField(default=0)
    discount_percent = models.IntegerField(default=0)
    is_display = models.BooleanField(default=False)

    def __str__(self):
        return self.supplier.name + self.name


class PromotionUsage(models.Model):
    promotion = models.ForeignKey(
        Promotion, on_delete=models.CASCADE, null=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True, blank=True)

    def __str__(self):
        return self.promotion.name+' used by order '+self.order.get_order_id()

    def create_usage(self, order, promotion_code):
        promotion = Promotion.objects.get(promotion_code=promotion_code)
        promotion_usage = PromotionUsage.objects.create(promotion=promotion,
                                                        order=order)
        promotion_usage.save()
        return promotion_usage

    def check_used(self, promotion, customer):
        try:
            PromotionUsage.objects.get(promotion__promotion_code=promotion, order__customer=customer)
        except:
            return False
        return True
