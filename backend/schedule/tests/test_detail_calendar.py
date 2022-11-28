from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from datetime import date

class TestCaseSetUp(APITestCase)  :
    def authenticate(self) :
        global family_id, user
        self.client.post(reverse("accounts:signup"),{"phone":"01011111111","name":"김조아","password":"Password123!","birth":"1999-11-11"})
        response=self.client.post(reverse('accounts:login'),{"phone":"01011111111","password":"Password123!"})
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {response.data['token']['access']}")
        response = self.client.post(reverse('families:family'),{"name":'family1'})
        user = self.client.get(reverse('accounts:profile'))
        family_id=user.data['family_id']
        user = user.data['id']   


class DetailCalendarTestCase(TestCaseSetUp) :
    def test_search_schedule(self):
        self.authenticate()
        today = date.today()
        response = self.client.post(reverse("calendar:create_search_calendar", kwargs={'date': today}),{
            'title':'캘린더 테스트1',
            'color':'blue',
            'important_mark': 'False',
            'start_date': '2025-11-1',
            'end_date': '2025-12-1'
        })
        schedule_id = response.data['id']
        response = self.client.get(reverse("calendar:detail_modify_delete_calendar", kwargs={'schedule_id': schedule_id}))
        self.assertEqual(response.data['title'], '캘린더 테스트1')
        self.assertEqual(response.data['color'], 'blue')
        self.assertEqual(response.data['important_mark'], False)
        self.assertEqual(response.data['start_date'], '2025-11-01')
        self.assertEqual(response.data['end_date'], '2025-12-01')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # 가족이 아닌 사람이 일정 확인시도 할 때
    def test_search_other_family_schedule(self):
        self.authenticate()
        today = date.today()
        response = self.client.post(reverse("calendar:create_search_calendar", kwargs={'date': today}),{
            'title':'캘린더 테스트1',
            'color':'blue',
            'important_mark': 'False', 
        })
        schedule_id = response.data['id']
        self.client.post(reverse("accounts:signup"),{"phone":"01022222222","name":"박조아","password":"Password123!","birth":"1999-11-11"})
        response=self.client.post(reverse('accounts:login'),{"phone":"01022222222","password":"Password123!"})
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {response.data['token']['access']}")
        self.client.post(reverse('families:family'),{"name":'family2'})
        response = self.client.get(reverse("calendar:detail_modify_delete_calendar", kwargs={'schedule_id': schedule_id}))
        self.assertEqual(response.data, '당신이 가입한 가족의 일정만 확인 가능합니다.')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_schedule(self):
        self.authenticate()
        today = date.today()
        response = self.client.post(reverse("calendar:create_search_calendar", kwargs={'date': today}),{
            'title':'캘린더 테스트1',
            'color':'blue',
            'important_mark': 'False', 
        })
        schedule_id = response.data['id']
        self.client.put(reverse("calendar:detail_modify_delete_calendar", kwargs={'schedule_id': schedule_id}),{"title" : "캘린더 수정 테스트."})
        response = self.client.get(reverse("calendar:detail_modify_delete_calendar", kwargs={'schedule_id': schedule_id}))
        self.assertEqual(response.data['title'], "캘린더 수정 테스트.")
        self.assertEqual(response.data['color'], "blue")
    
    # 다른 가족의 멤버가 일정 수정할 때
    def test_update_other_family_schedule(self):
        self.authenticate()
        today = date.today()
        response = self.client.post(reverse("calendar:create_search_calendar", kwargs={'date': today}),{
            'title':'캘린더 테스트1',
            'color':'blue',
            'important_mark': 'False', 
        })
        schedule_id = response.data['id']
        self.client.post(reverse("accounts:signup"),{"phone":"01022222222","name":"박조아","password":"Password123!","birth":"1999-11-11"})
        response=self.client.post(reverse('accounts:login'),{"phone":"01022222222","password":"Password123!"})
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {response.data['token']['access']}")
        self.client.post(reverse('families:family'),{"name":'family2'})
        response = self.client.put(reverse("calendar:detail_modify_delete_calendar", kwargs={'schedule_id': schedule_id}),{"title" : "캘린더 수정 테스트."})
        self.assertEqual(response.data, "권한이 없습니다.")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_delete_schedule(self):
        self.authenticate()
        today = date.today()
        response = self.client.post(reverse("calendar:create_search_calendar", kwargs={'date': today}),{
            'title':'캘린더 테스트1',
            'color':'blue',
            'important_mark': 'False', 
        })
        schedule_id = response.data['id']
        response = self.client.delete(reverse("calendar:detail_modify_delete_calendar", kwargs={'schedule_id': schedule_id}))
        self.assertEqual(response.data, "해당 스케줄을 삭제하였습니다.")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
    
    # 다른 가족이 삭제하려고 시도할 때
    def test_delete_other_family_schedule(self):
        self.authenticate()
        today = date.today()
        response = self.client.post(reverse("calendar:create_search_calendar", kwargs={'date': today}),{
            'title':'캘린더 테스트1',
            'color':'blue',
            'important_mark': 'False', 
        })
        schedule_id = response.data['id']
        self.client.post(reverse("accounts:signup"),{"phone":"01022222222","name":"박조아","password":"Password123!","birth":"1999-11-11"})
        response=self.client.post(reverse('accounts:login'),{"phone":"01022222222","password":"Password123!"})
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {response.data['token']['access']}")
        self.client.post(reverse('families:family'),{"name":'family2'})
        response = self.client.delete(reverse("calendar:detail_modify_delete_calendar", kwargs={'schedule_id': schedule_id}))
        self.assertEqual(response.data, "권한이 없습니다.")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        