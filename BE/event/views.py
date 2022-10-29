from rest_framework.generics import CreateAPIView,GenericAPIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from event.models import PhoneAuthentication
from django.shortcuts import get_object_or_404
from event.serializers import PhoneAuthenticationAcceptSerializer, PhoneAuthenticationSerializer
from datetime import datetime,timedelta
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

