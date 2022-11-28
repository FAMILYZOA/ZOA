from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
class TestCaseSetUp(APITestCase) :
    #기본 로그인 로직 
    def authenticate(self) :
        self.client.post(reverse("accounts:signup"),{"phone":"01046509260","name":"김조아","password":"Password123!","birth":"1999-11-11"})
        response=self.client.post(reverse('accounts:login'),{"phone":"01046509260","password":"Password123!"})
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {response.data['token']['access']}")


class UserProfileTestCase(TestCaseSetUp) :

    def test_user_profile_get(self) :
        self.authenticate()
        response = self.client.get(reverse('accounts:profile'))
        self.assertEqual('01046509260',response.data['phone'])
        self.assertEqual(response.status_code,status.HTTP_200_OK)

    def test_user_profile_edit(self) :
        self.authenticate()
        response = self.client.put(reverse('accounts:profile'),{'phone':'01017771777'})
        self.assertEqual('01017771777',response.data['phone'])
        self.assertEqual(response.status_code,status.HTTP_200_OK)

    def test_user_password_edit(self) :
        self.authenticate()
        response = self.client.put(reverse('accounts:password'),{'old_password':'Password123!','password':'Password12!@','password2':'Password12!@'})
        self.assertEqual(response.status_code,status.HTTP_200_OK)