from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status

class TestCaseSetUp(APITestCase)  :
    def authenticate(self) :
        global family_id1, user1
        self.client.post(reverse("accounts:signup"),{"phone":"01011111111","name":"김조아","password":"Password123!","birth":"1999-11-11"})
        response=self.client.post(reverse('accounts:login'),{"phone":"01011111111","password":"Password123!"})
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {response.data['token']['access']}")
        response = self.client.post(reverse('families:family'),{"name":'family1'})
        user1 = self.client.get(reverse('accounts:profile'))
        family_id1=user1.data['family_id']
        user1 = user1.data['id']    

class CreateChecklistTestCase(TestCaseSetUp) :
    #  성공적으로 투두를 부여
    def test_create_checklist1(self):
        self.authenticate()
        response = self.client.post(reverse("checklist:checklistcreate"),{'text':'체크리스트 테스트','to_users_id':user1})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    # 가족에 가입되지 않았는데 checklist를 부여할 때
    def test_create_checklist2(self):
        self.client.post(reverse("accounts:signup"),{"phone":"01012341234","name":"이조아","password":"Password123!","birth":"1999-11-11"})
        response = self.client.post(reverse('accounts:login'),{"phone":"01012341234","password":"Password123!"})
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {response.data['token']['access']}")
        response = self.client.post(reverse("checklist:checklistcreate"),{'text':'체크리스트 테스트','to_users_id':1})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    # 다른 가족의 멤버에게 checklist를 부여할 때
    def test_create_checklist3(self):
        self.authenticate()
        self.client.post(reverse("accounts:signup"),{"phone":"01012341234","name":"이조아","password":"Password123!","birth":"1999-11-11"})
        response2 = self.client.post(reverse('accounts:login'),{"phone":"01012341234","password":"Password123!"})
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {response2.data['token']['access']}")
        self.client.post(reverse('families:family'),{"name":'family2'})
        response3 = self.client.post(reverse("checklist:checklistcreate"),{'text':'체크리스트 테스트','to_users_id':user1})
        self.assertEqual(response3.status_code, status.HTTP_400_BAD_REQUEST)