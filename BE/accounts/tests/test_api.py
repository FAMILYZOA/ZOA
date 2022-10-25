from rest_framework.test import APITestCase
from accounts.models import User 
from django.urls import reverse
from rest_framework import status

class UserTestCase(APITestCase) :
    #기본 로그인 로직 
    def authenticate(self) :
        self.client.post(reverse("accounts:signup"),{"phone":"01046509260","name":"김조아","password":"Password123!","birth":"1999-11-11"})
        response=self.client.post(reverse('accounts:login'),{"phone":"01046509260","password":"Password123!"})
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {response.data['token']}")

    
class UserSignupTestCase(APITestCase) :

    def test_success_signup(self) :
        response = self.client.post(reverse("accounts:signup"),{"phone":"01046509260","name":"김조아","password":"Password123!","birth":"1999-11-11"})
        self.assertEqual(response.status_code,status.HTTP_201_CREATED)
    
    def test_when_ununique_number_suplied(self) :
        self.client.post(reverse("accounts:signup"),{"phone":"01046509260","name":"김조아","password":"Password123!","birth":"1999-11-11"})
        response = self.client.post(reverse("accounts:signup"),{"phone":"01046509260","name":"김조아","password":"Password123!","birth":"1999-11-11"})
        print(response.data)

        
