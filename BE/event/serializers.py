from rest_framework import serializers
import hmac, hashlib, base64
import time
import requests,json
import random
from django.conf import settings
from event.models import PhoneAuthentication 

ServerId = settings.SMS_SECRET['SMSServiceId']
sms_uri = f'/sms/v2/services/{ServerId}/messages'
sms_url= f'https://sens.apigw.ntruss.com{sms_uri}'
def	make_signature(uri):
    timestamp = int(time.time() * 1000)
    timestamp = str(timestamp)

    #access key
    access_key = settings.SMS_SECRET['SMSServiceId']	# access key id (from portal or Sub Account)
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
            pass
        if response.status_code == 400 :
            pass
        if response.status_code == 401 :
            pass
        if response.status_code == 403 :
            pass
        if response.status_code == 404 :
            pass
        if response.status_code == 429 :
            pass
        if response.status_code == 500 :
            pass
        return Certification_Number
class PhoneAuthenticationSerializer(serializers.ModelSerializer) :

    class Meta :
        model = PhoneAuthentication
        fields = ('phone',)

    def create(self, validated_data):
        phone = validated_data['phone']
        certification = sms(phone)
        instance = PhoneAuthentication.objects.create(phone=phone,certification=certification)
        instance.save()
        return instance
