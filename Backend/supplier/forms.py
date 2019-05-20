from django.forms import ModelForm
from supplier.models import SupplierRegisterForm

# Create the form class.
class SupplierForm(ModelForm):
    class Meta: 
        model = SupplierRegisterForm
        fields = '__all__'
