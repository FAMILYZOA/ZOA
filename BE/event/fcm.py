from firebase_admin import messaging, auth
from accounts.models import User
from .models import Device
def send_to_firebase_cloud_messaging(token, title, body, deep_link):
    registration_token = token
    message = messaging.Message(
        notification=messaging.Notification(
            title=title,
            body=body,
        ),
        token=registration_token,
        data={
            "url": deep_link,
        },
    )
    try:
        response = messaging.send(message)
        print(f"Successfully sent message: {response}")
    except Exception as e:
        print("예외가 발생했습니다.", e)

def get_group_user_token(family_id):
    user_list = User.objects.filter(family_id=family_id)
    device_list = [device for device in Device.objects.filter(user__in = user_list)]
    return device_list

family_id = 1
title = 'title'
body = 'body'
deep_link = 'familyzoa.com'
device_list = get_group_user_token(family_id)
for device in device_list :
    send_to_firebase_cloud_messaging(device.fcmToken, title, body, deep_link)