from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
# Create your tests here.


class SMSTestCase(APITestCase) :
    #기본 로그인 로직 
    def test_sms_post_authenticate(self) :
        authentication =self.client.post(reverse("event:sms_post"),{"phone":"01046509260"})
        self.assertTrue(authentication.status_code,status.HTTP_201_CREATED)
        response = self.client.post(reverse("event:sms_checker"),{"phone":"01046509260",'certification' : authentication.data['certification']})
        self.assertTrue(response.status_code,status.HTTP_200_OK)
