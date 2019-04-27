from .models import User
from customer.models import Customer
from activity.models import Activity
import datetime


def save_profile(backend, user, response, *args, **kwargs):

    if backend.name == 'facebook':

        try:
            customer = user.get_customer()
        except:
            customer = None
        if customer is None:
            user.is_customer = True
            user.save()
            customer = Customer(user_id=user.id)
            try:
                customer.birthday = datetime.datetime.strptime(
                    response['birthday'], '%m/%d/%Y').strftime('%Y-%m-%d')
            except:
                pass
            try:
                url = "http://graph.facebook.com/%s/picture?type=large" \
                    % response["id"]
                if url:
                    from urllib.request import urlopen, HTTPError
                    from django.template.defaultfilters import slugify
                    from django.core.files.base import ContentFile
                    avatar = urlopen(url)
                    customer.profile_picture.save(slugify(user.username + " social") + '.jpg',
                                                  ContentFile(avatar.read()))
            except HTTPError:
                pass
            customer.save()
            Activity.push(user,201,user.username+' is register with facebook')
        Activity.push(user,101,user.username+' log in as customer with facebook.')

