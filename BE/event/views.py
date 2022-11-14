from rest_framework.generics import CreateAPIView,GenericAPIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from event.models import PhoneAuthentication
from django.shortcuts import get_object_or_404
from event.serializers import PhoneAuthenticationAcceptSerializer, PhoneAuthenticationSerializer, FCMLoginSerializer
from datetime import datetime,timedelta
from .fcm import send_to_firebase_cloud_messaging, get_group_user_token
from .models import Device
# Create your views here.



class PhoneAuthenticationView(CreateAPIView) :
    permission_classes = [ AllowAny ]
    serializer_class = PhoneAuthenticationSerializer

class AuthenticationAcceptAPIView(GenericAPIView) :
    permission_classes = [AllowAny] 
    serializer_class = PhoneAuthenticationAcceptSerializer
    def get_object(self, queryset=None):
        phone = self.request.data.get('phone',None)
        certification = self.request.data.get('certification',None)
        obj = get_object_or_404(PhoneAuthentication,phone=phone,certification=certification)
        return obj
    
    def post(self,request) :
        obj = self.get_object()
        now = datetime.now()
        naive_now = now.replace(tzinfo=None)
        if obj.created_at < naive_now-timedelta(minutes=5) :
            return Response({'인증 기간이 만료되었습니다. 인증 기간은 5분입니다.'},status=status.HTTP_401_UNAUTHORIZED)
        return Response(status=status.HTTP_200_OK)


class FCMLoginView(CreateAPIView):
    serializer_class = FCMLoginSerializer
    def post(self, request) :
        FCM_token = request.data['fcmToken']
        if Device.objects.filter(fcmToken=FCM_token):
            return Response("이미 등록된 기기입니다.", status=status.HTTP_400_BAD_REQUEST)
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=self.request.user, active=True)
            return Response(serializer.data, status=status.HTTP_201_CREATED)


class FCMLogoutAPIView(CreateAPIView):
    def delete(self, request, FCM_id):
        FCM_token = get_object_or_404(Device, id=FCM_id)
        if FCM_token.user == request.user:
            FCM_token.delete()
            return Response("로그아웃 되었습니다.", status=status.HTTP_204_NO_CONTENT)  