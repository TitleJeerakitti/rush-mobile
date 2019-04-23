from django.db import models
from rest_framework import status
from account.models import User

# Create your models here.


class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    expo_token = models.CharField(max_length=100)
    timestamp = models.DateTimeField(auto_now_add=True, blank=True)
    def set_token(self, token):
        self.expo_token = token
        self.save()

    @staticmethod
    def create(user, token):
        return Notification.objects.create(
            user=user,
            expo_token=token
        )

    def send_notification(self,message,title,data):
        message = Message.objects.create(
            notification=self,
            message=message,
            title=title
        )
        return message.send_push_message(data)

class Message(models.Model):
    notification = models.ForeignKey(Notification, on_delete=models.CASCADE)
    message = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    timestamp = models.DateTimeField(auto_now_add=True, blank=True)

    def send_push_message(self,data):
        from exponent_server_sdk import DeviceNotRegisteredError
        from exponent_server_sdk import PushClient
        from exponent_server_sdk import PushMessage
        from exponent_server_sdk import PushResponseError
        from exponent_server_sdk import PushServerError
        from requests.exceptions import ConnectionError
        from requests.exceptions import HTTPError
        try:
            PushClient().publish(
                PushMessage(to=self.notification.expo_token,
                            body=self.message,
                            title=self.title,
                            sound='default',
                            data=data))
            return status.HTTP_200_OK
        except:
            return status.HTTP_400_BAD_REQUEST