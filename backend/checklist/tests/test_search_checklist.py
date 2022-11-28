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


class SearchChecklistTestCase(TestCaseSetUp) :
    def test_search_checklist(self):
        self.authenticate() 
        self.client.post(reverse("checklist:checklistcreate"),{'text':'체크리스트 테스트1','to_users_id':user1})
        self.client.post(reverse("checklist:checklistcreate"),{'text':'체크리스트 테스트2','to_users_id':user1})
        self.client.post(reverse("checklist:checklistcreate"),{'text':'체크리스트 테스트3','to_users_id':user1})
        response = self.client.get(reverse("checklist:checklistsearch", kwargs={'to_users_id':user1}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['results'][0]['text'], '체크리스트 테스트1')
        self.assertEqual(response.data['results'][1]['text'], '체크리스트 테스트2')
        self.assertEqual(response.data['results'][2]['text'], '체크리스트 테스트3')


class SearchChecklistTestCase(TestCaseSetUp) :
    def test_search_checklist(self):
        self.authenticate() 
        self.client.post(reverse("checklist:checklistcreate"),{'text':'체크리스트 테스트1','to_users_id':user1})
        self.client.post(reverse("checklist:checklistcreate"),{'text':'체크리스트 테스트2','to_users_id':user1})
        self.client.post(reverse("checklist:checklistcreate"),{'text':'체크리스트 테스트3','to_users_id':user1})
        response = self.client.get(reverse("checklist:checklistsearch", kwargs={'to_users_id':user1}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
