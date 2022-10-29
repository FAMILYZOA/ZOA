from rest_framework.generics import CreateAPIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from event.serializers import PhoneAuthenticationSerializer
# Create your views here.



class PhoneAuthenticationView(CreateAPIView) :
    permission_classes = [ AllowAny ]
    serializer_class = PhoneAuthenticationSerializer
