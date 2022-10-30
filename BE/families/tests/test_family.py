from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from datetime import date
from rest_framework.exceptions import ErrorDetail

from families.models import Family 

class TestCaseSetUp(APITestCase) :
    #기본 로그인 로직 
    def authenticate(self) :
        self.client.post(reverse("accounts:signup"),{"phone":"01046509260","name":"김조아","password":"Password123!","birth":"1999-11-11"})
        response=self.client.post(reverse('accounts:login'),{"phone":"01046509260","password":"Password123!"})
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {response.data['token']['access']}")
    def create_family(self) :
        self.authenticate()
        self.client.post(reverse('families:family'),{"name":'family'})

    def other_authenticate(self) :
        self.create_family()
        self.client.post(reverse("accounts:signup"),{"phone":"01046509261","name":"이조아","password":"Password123!","birth":"1999-11-11"})
        response=self.client.post(reverse('accounts:login'),{"phone":"01046509261","password":"Password123!"})
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

class FamliyGetTestCase(TestCaseSetUp) :
    def test_family_get_info(self) :
        self.create_family()
        response = self.client.get(reverse('families:info',kwargs={'id':2}))
        self.assertEqual(response.status_code,status.HTTP_200_OK)

    def test_family_get_not_found(self) :
        self.authenticate()
        response = self.client.get(reverse('families:info',kwargs={'id':1}))
        self.assertEqual(response.status_code,status.HTTP_404_NOT_FOUND)

class FamliySignTestCase(TestCaseSetUp) :
    def test_family_success_sign(self) :
        self.other_authenticate()
        response = self.client.post(reverse('families:join_family',kwargs={'family_id':4}))
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.assertEqual(response.data['success'],'이조아님이 family에 가입되었습니다.')

    def test_family_get_not_found(self) :
        self.create_family()
        response = self.client.post(reverse('families:join_family',kwargs={'family_id':3}))
        self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['fail'],'김조아님은 이미 가족에 가입되어 있습니다.')

