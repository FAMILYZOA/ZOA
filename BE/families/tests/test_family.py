from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from datetime import date
from rest_framework.exceptions import ErrorDetail 

class TestCaseSetUp(APITestCase) :
    #기본 로그인 로직 
    def authenticate(self) :
        self.client.post(reverse("accounts:signup"),{"phone":"01046509260","name":"김조아","password":"Password123!","birth":"1999-11-11"})
        response=self.client.post(reverse('accounts:login'),{"phone":"01046509260","password":"Password123!"})
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {response.data['token']['access']}")

class FamliyCreateTestCase(TestCaseSetUp) :

    #성공적인 Family 생성 요청
    def test_family_success_create(self) :
        self.authenticate()
        response=self.client.post(reverse('families:family'),{"name":'family'})
        today = date.today()
        self.assertEqual('family',response.data['name'])
        self.assertEqual(today.strftime("%Y-%m-%d"),response.data['created_at'])
        self.assertEqual(response.status_code,status.HTTP_201_CREATED)

    #인증되지 않은 user의 post 요청 
    def test_family_not_autenticate_user_create(self) :
        response=self.client.post(reverse('families:family'),{"name":'family'})
        self.assertEqual(response.status_code,status.HTTP_401_UNAUTHORIZED)

    #성공적인 Family 생성 요청시 이름 규약 위반 
    def test_family_invalid_character_length_create(self) :
        self.authenticate()
        response=self.client.post(reverse('families:family'),{"name":'familyfamilyfamily'})
        exception = [ErrorDetail(string='이 필드의 글자 수가 13 이하인지 확인하십시오.', code='max_length')]
        self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['name'],exception)