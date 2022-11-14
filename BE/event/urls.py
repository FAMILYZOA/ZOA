from django.urls import path
from event.views import AuthenticationAcceptAPIView, PhoneAuthenticationView, FCMLoginView, FCMLogoutAPIView

app_name = 'event'

urlpatterns = [
    path('', PhoneAuthenticationView.as_view(), name="sms_post"),

    path('check/', AuthenticationAcceptAPIView.as_view(), name="sms_checker"),

    path('FCM/', FCMLoginView.as_view(), name="FCM_post"),

    path('FCM/<int:FCM_id>/', FCMLogoutAPIView.as_view(), name="FCM_delete"),
    
]
