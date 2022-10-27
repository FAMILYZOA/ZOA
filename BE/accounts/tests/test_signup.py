from rest_framework.test import APITestCase
from accounts.models import User 
from django.urls import reverse
from rest_framework import status
from rest_framework.exceptions import ErrorDetail 
class UserTestCase(APITestCase) :
    #기본 로그인 로직 
    def authenticate(self) :
        self.client.post(reverse("accounts:signup"),{"phone":"01046509260","name":"김조아","password":"Password123!","birth":"1999-11-11"})
        response=self.client.post(reverse('accounts:login'),{"phone":"01046509260","password":"Password123!"})
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {response.data['token']['access']}")

    
class UserSignupTestCase(APITestCase) :

    def test_success_signup(self) :
        response = self.client.post(reverse("accounts:signup"),{"phone":"01046509260","name":"김조아","password":"Password123!","birth":"1999-11-11"})
        self.assertEqual(response.status_code,status.HTTP_201_CREATED)

    def test_when_ununique_number_suplied(self) :
        self.client.post(reverse("accounts:signup"),{"phone":"01046509260","name":"김조아","password":"Password123!","birth":"1999-11-11"})
        response = self.client.post(reverse("accounts:signup"),{"phone":"01046509260","name":"김조아","password":"Password123!","birth":"1999-11-11"})
        exception = [ErrorDetail(string='사용자의 휴대폰 번호은/는 이미 존재합니다.', code='unique')]
        self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['phone'],exception)
        
    def test_when_not_valid_phone_suplied(self) :
        response = self.client.post(reverse("accounts:signup"),{"phone":"stringstrin","name":"김조아","password":"Password123!","birth":"1999-11-11"})
        exception = [ErrorDetail(string='휴대폰 번호는 숫자 형식이어야 합니다.', code='invalid')]
        self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['non_field_errors'],exception)

    def test_when_not_valid_length_password_suplied(self) :
        response = self.client.post(reverse("accounts:signup"),{"phone":"01046509260","name":"김조아","password":"passs","birth":"1999-11-11"})
        exception = [ErrorDetail(string='이 필드의 글자 수가  적어도 8 이상인지 확인하십시오.', code='min_length')]
        self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['password'],exception)

    def test_when_not_valid_password_suplied(self) :
        response = self.client.post(reverse("accounts:signup"),{"phone":"01046509260","name":"김조아","password":"password123!","birth":"1999-11-11"})
        exception = [ErrorDetail(string='비밀번호는 숫자, 대/소문자, 특수문자를 사용해야 합니다.', code='regex')]
        self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['non_field_errors'],exception)
        

        
