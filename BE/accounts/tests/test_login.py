from rest_framework.test import APITestCase
from accounts.models import User 
from django.urls import reverse
from rest_framework import status
from rest_framework.exceptions import ErrorDetail 

class TestCaseSetUp(APITestCase) :
    #기본 로그인 로직 
    def authenticate(self) :
        self.client.post(reverse("accounts:signup"),{"phone":"01046509260","name":"김조아","password":"Password123!","birth":"1999-11-11"})

class UserLoginTestCase(TestCaseSetUp) :
    #기본 로그인 로직 
    def test_success_login(self) :
        self.authenticate()
        response=self.client.post(reverse('accounts:login'),{"phone":"01046509260","password":"Password123!"})
        self.assertEqual(response.status_code,status.HTTP_200_OK)

    def test_when_phone_not_suplied(self) :
        self.authenticate()
        response=self.client.post(reverse('accounts:login'),{"password":"Password123!"})
        exception = '휴대폰 번호를 입력하세요'
        self.assertEqual(response.data['phone'],exception)
        
    def test_when_phone_is_empty(self) :
        self.authenticate()
        response=self.client.post(reverse('accounts:login'),{"phone":"","password":"Password123!"})
        exception = '휴대폰 번호를 입력하세요'
        self.assertEqual(response.data['phone'],exception)

    def test_when_password_not_suplied(self) :
        self.authenticate()
        response=self.client.post(reverse('accounts:login'),{"phone":"01046509260"})
        exception = '비밀번호를 입력하세요'
        self.assertEqual(response.data['password'],exception)

    def test_when_password_is_empty(self) :
        self.authenticate()
        response=self.client.post(reverse('accounts:login'),{"phone":"01046509260","password":""})
        exception = '비밀번호를 입력하세요'
        self.assertEqual(response.data['password'],exception)

    def test_when_unAutorized_user(self) :
        self.authenticate()
        response=self.client.post(reverse('accounts:login'),{"phone":"01046509261","password":"Password123!"})
        exception = '로그인에 실패했습니다.'
        self.assertEqual(response.data['login'],exception)

class UserLogoutTestCase(TestCaseSetUp) :
    def test_successful_logout(self):
        self.authenticate()
        login_response=self.client.post(reverse('accounts:login'),{"phone":"01046509260","password":"Password123!"})
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {login_response.data['token']['access']}")
        refresh = login_response.data['token']['refresh']
        response = self.client.post(reverse('accounts:logout'),{'refresh':refresh})
        self.assertEqual(response.status_code,status.HTTP_204_NO_CONTENT)
        self.assertEqual(response.data,('로그아웃 되었습니다.'))

        
    