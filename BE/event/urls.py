from django.urls import path
from event.views import AuthenticationAcceptAPIView, PhoneAuthenticationView

app_name = 'event'

urlpatterns = [
    path('', PhoneAuthenticationView.as_view(), name="sms_post"),

    path('check/', AuthenticationAcceptAPIView.as_view(), name="sms_checker"),
    
]
