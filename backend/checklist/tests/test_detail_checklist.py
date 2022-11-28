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


class DetailChecklistTestCase(TestCaseSetUp) :
    # checklist 상세 조회
    def test_detail_search_checklist(self):
        self.authenticate()
        response = self.client.post(reverse("checklist:checklistcreate"),{'text':'체크리스트 테스트','to_users_id':user1})
        checklist = response.data[0]['id']
        response = self.client.get(reverse("checklist:checklistupdatedelete", kwargs={'checklist_id': checklist}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # checklist 달성/미달성 변경
    def test_detail_update_checklist(self):
        self.authenticate()
        response = self.client.post(reverse("checklist:checklistcreate"),{'text':'체크리스트 테스트','to_users_id':user1})
        checklist = response.data[0]['id']
        response = self.client.get(reverse("checklist:checklistupdatedelete", kwargs={'checklist_id': checklist}))
        self.assertEqual(response.data['status'], False)
        response = self.client.put(reverse("checklist:checklistupdatedelete", kwargs={'checklist_id': checklist}),{'status':'True'})
        self.assertEqual(response.data['status'], True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # checklist 부여된 사람이 아닐 때, todo를 완료할 때
    def test_detail_update_giver_checklist(self):
        self.authenticate()
        self.client.post(reverse("accounts:signup"),{"phone":"01012341234","name":"이조아","password":"Password123!","birth":"1999-11-11"})
        response2 = self.client.post(reverse('accounts:login'),{"phone":"01012341234","password":"Password123!"})
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {response2.data['token']['access']}")
        response = self.client.post(reverse('families:join_family',kwargs={'family_id':family_id1}))
        response = self.client.post(reverse("checklist:checklistcreate"),{'text':'체크리스트 테스트','to_users_id':user1})
        checklist = response.data[0]['id']
        response = self.client.put(reverse("checklist:checklistupdatedelete", kwargs={'checklist_id': checklist}),{'status':'True'})
        self.assertEqual(response.data, 'Todo가 부여된 사용자가 아닙니다.')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    # checklist 삭제
    def test_detail_delete_giver_checklist(self):
        self.authenticate()
        response = self.client.post(reverse("checklist:checklistcreate"),{'text':'체크리스트 테스트','to_users_id':user1})
        checklist = response.data[0]['id']
        response = self.client.delete(reverse("checklist:checklistupdatedelete", kwargs={'checklist_id': checklist}))
        self.assertEqual(response.data, '해당 Todo를 삭제하였습니다.')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    # checklist 부여한 사람이 아닐 때, checklist 삭제
    def test_detail_delete_checklist(self):
        self.authenticate()
        self.client.post(reverse("accounts:signup"),{"phone":"01012341234","name":"이조아","password":"Password123!","birth":"1999-11-11"})
        response2 = self.client.post(reverse('accounts:login'),{"phone":"01012341234","password":"Password123!"})
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {response2.data['token']['access']}")
        response = self.client.post(reverse('families:join_family',kwargs={'family_id':family_id1}))
        response2 = self.client.post(reverse("checklist:checklistcreate"),{'text':'체크리스트 테스트','to_users_id':user1})
        response = self.client.post(reverse('accounts:login'),{"phone":"01011111111","password":"Password123!"})
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {response.data['token']['access']}")
        checklist = response2.data[0]['id']
        response = self.client.delete(reverse("checklist:checklistupdatedelete", kwargs={'checklist_id': checklist}))
        self.assertEqual(response.data, 'Todo 부여자가 아닙니다.')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    # checklist 미달성한 checklist만 조회
    def test_detail_update_checklist(self):
        self.authenticate()
        response = self.client.post(reverse("checklist:checklistcreate"),{'text':'체크리스트 테스트1','to_users_id':user1})
        response = self.client.post(reverse("checklist:checklistcreate"),{'text':'체크리스트 테스트2','to_users_id':user1})
        response = self.client.post(reverse("checklist:checklistcreate"),{'text':'체크리스트 테스트3','to_users_id':user1})
        checklist = response.data[0]['id']
        response = self.client.get(reverse("checklist:checklistupdatedelete", kwargs={'checklist_id': checklist}))
        response = self.client.put(reverse("checklist:checklistupdatedelete", kwargs={'checklist_id': checklist}),{'status':'True'})
        response = self.client.get(reverse("checklist:checklistsearch", kwargs={'to_users_id':user1}), {"search" : 0})
        self.assertEqual(response.status_code, status.HTTP_200_OK)