from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from datetime import date
from rest_framework.exceptions import ErrorDetail

class TestCaseSetUp(APITestCase)  :
    def authenticate(self) :
        global user
        self.client.post(reverse("accounts:signup"),{"phone":"01046509260","name":"김조아","password":"Password123!","birth":"1999-11-11"})
        response=self.client.post(reverse('accounts:login'),{"phone":"01046509260","password":"Password123!"})
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {response.data['token']['access']}")
        response = self.client.post(reverse('families:family'),{"name":'family'})
        user = self.client.get(reverse('accounts:profile'))
        user = user.data['id']
    
    def create_scrum(self) :
        self.authenticate()
        self.client.post(reverse("scrums:scrum"),{'emoji':'😀','today':'축구함','yesterday':'농구함'})

class ScrumyCreateTestCase(TestCaseSetUp) :

    def test_1_create_scrum(self):
        self.authenticate()
        response = self.client.post(reverse("scrums:scrum"),{'emoji':'😀','today':'축구함','yesterday':'농구함'})
        self.assertEqual(response.status_code,status.HTTP_201_CREATED)
        self.assertEqual(response.data['emoji'],'😀')
        self.assertEqual(response.data['today'],'축구함')
        self.assertEqual(response.data['yesterday'],'농구함')

    def test_2_create_scrum_again(self):
        self.authenticate()
        self.client.post(reverse("scrums:scrum"),{'emoji':'😀','today':'축구함','yesterday':'농구함'})
        response = self.client.post(reverse("scrums:scrum"),{'emoji':'😀','today':'야구함','yesterday':'배구함'})
        self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data,{'스크럼은 하루에 한 개만 작성 가능합니다.'})

    def test_3_create_scrum_not_family(self):
        self.client.post(reverse("accounts:signup"),{"phone":"01046509260","name":"김조아","password":"Password123!","birth":"1999-11-11"})
        response=self.client.post(reverse('accounts:login'),{"phone":"01046509260","password":"Password123!"})
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {response.data['token']['access']}")
        response = self.client.post(reverse("scrums:scrum"),{'emoji':'😀','today':'야구함','yesterday':'배구함'})
        self.assertEqual(response.status_code,status.HTTP_403_FORBIDDEN)
        self.assertEqual(response.data['detail'],ErrorDetail(string='이 작업을 수행할 권한(permission)이 없습니다.', code='permission_denied'))


class ScrumRetriveTestCase(TestCaseSetUp):

    def test_1_retrive_scrum_today(self):
        self.create_scrum()
        response = self.client.get(reverse("scrums:scrum"))
        self.assertEqual(response.status_code,status.HTTP_200_OK)
    def test_2_retrive_scrum_main(self) :
        self.create_scrum()
        response = self.client.get(reverse("scrums:main_scrum"))
        self.assertEqual(response.status_code,status.HTTP_200_OK)
    def test_4_create_or_read_scrum_not_family(self):
        self.client.post(reverse("accounts:signup"),{"phone":"01046509260","name":"김조아","password":"Password123!","birth":"1999-11-11"})
        response=self.client.post(reverse('accounts:login'),{"phone":"01046509260","password":"Password123!"})
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {response.data['token']['access']}")
        response = self.client.get(reverse("scrums:scrum"))
        self.assertEqual(response.status_code,status.HTTP_403_FORBIDDEN)
