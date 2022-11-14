from rest_framework.serializers import ValidationError
from rest_framework import status
import hmac, hashlib, base64
import time
import requests,json
import random
from django.conf import settings
from event.models import PhoneAuthentication, Device
from rest_framework import serializers
from accounts.models import User
class ValidationError403(ValidationError) :
    status_code = status.HTTP_403_FORBIDDEN
class ValidationError406(ValidationError) :
    status_code = status.HTTP_406_NOT_ACCEPTABLE
class ValidationError408(ValidationError) :
    status_code = status.HTTP_408_REQUEST_TIMEOUT


ServerId = settings.SMS_SECRET['SMSServiceId']
sms_uri = f'/sms/v2/services/{ServerId}/messages'
sms_url= f'https://sens.apigw.ntruss.com{sms_uri}'
def	make_signature(uri):
    timestamp = int(time.time() * 1000)
    timestamp = str(timestamp)

    #access key
    access_key = settings.SMS_SECRET['SMSAccessKey']	# access key id (from portal or Sub Account)
	#secret_key
    secret_key = settings.SMS_SECRET['SMSSecretKey']
	
    secret_key = bytes(secret_key, 'UTF-8')
    
    method = "POST"

    message = method + " " + uri + "\n" + timestamp + "\n"+ access_key
    message = bytes(message, 'UTF-8')
    signingKey = base64.b64encode(hmac.new(secret_key, message, digestmod=hashlib.sha256).digest())
    
    return timestamp,access_key,signingKey
def sms(phone) :

        Certification_Number = ''

        for _ in range(6) :
            Certification_Number += str(random.randint(1,9))
        stamp,key,sign = make_signature(sms_uri)
        headers = {
            "Content-Type": "application/json; charset=utf-8",
            "x-ncp-apigw-timestamp": stamp,
            "x-ncp-iam-access-key": key,
            "x-ncp-apigw-signature-v2": sign
            }

        body  = {
            "type":"SMS",
            "from": settings.SMS_SECRET['FromUser'],
            "content":"인증번호 전송",
            "messages":[
                {
                    "to":f"{phone}",
                    "content":f"[가족과 함께 ZOA] 인증번호 [{Certification_Number}]를 입력해주세요"
                }
            ]
        }
        response = requests.post(sms_url, data=json.dumps(body),headers=headers)
        if response.status_code == 202 :
            return Certification_Number
        if response.status_code == 400 :
            raise ValidationError('올바르지 않은 휴대폰 번호 형식이거나, 입력값이 휴대폰 번호가 아닙니다.')
        if response.status_code in (401,403,404) :
            raise ValidationError403('서버의 인증에 문제가 있습니다...')
        if response.status_code == 429 :
            raise ValidationError408('요청을 너무 많이 보냈습니다. 잠시 후 시도해주세요.')
        if response.status_code == 500 :
            raise ValidationError406('SMS 인증 API 서버 에러')

class PhoneAuthenticationSerializer(serializers.ModelSerializer) :

    class Meta :
        model = PhoneAuthentication
        fields = ('phone','certification')
        read_only_fields = ('certification',)

    def create(self, validated_data):
        phone = validated_data['phone']
        certification = sms(phone)
        if PhoneAuthentication.objects.filter(phone=phone).exists() :
            instance = PhoneAuthentication.objects.get(phone=phone)
            instance.certification = certification 
            instance.save()
            return instance
        instance = PhoneAuthentication.objects.create(phone=phone,certification=certification)
        instance.save()
        return instance

class PhoneAuthenticationAcceptSerializer(serializers.ModelSerializer) :

    class Meta :
        model = PhoneAuthentication
        fields = ('phone','certification')


class UserinfoSerializer(serializers.ModelSerializer):
    class Meta :
        model = User
        fields = ('id', 'name', 'family_id',)


class FCMLoginSerializer(serializers.ModelSerializer) :
    user = UserinfoSerializer(read_only=True)
    fcmToken = serializers.CharField(max_length=500, required=True)
    class Meta :
        model = Device
        fields = ('user', 'id', 'fcmToken', 'active')