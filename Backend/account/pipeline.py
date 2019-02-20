from .models import User
from customer.models import Customer


def save_profile(backend, user, response, *args, **kwargs):
    if backend.name == 'facebook':
        customer = user.get_customer()
        if customer is None:
            user.is_customer=True
            user.save()
            customer = Customer(user_id=user.id)   
            try: 
                customer.birthday = response['birthday']
            except:
                pass
            customer.profile_picture = response['picture']['data']['url']   
            customer.save()
