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


class MonthSearchCalendarTestCase(TestCaseSetUp) :
    def test_search_schedule(self):
        self.authenticate()
        today = date.today()
        self.client.post(reverse("calendar:create_search_calendar", kwargs={'date': today}),{
            'title':'캘린더 테스트1',
            'color':'blue',
            'start_date': '2022-11-1',
            'end_date': '2022-12-1',
            'important_mark': 'False', 
        })
        self.client.post(reverse("calendar:create_search_calendar", kwargs={'date': today}),{
            'title':'캘린더 테스트2', 
            'color':'red', 
            'important_mark': 'False',
            'start_date': '2022-11-1',
            'end_date': '2022-12-1'
        })
        self.client.post(reverse("calendar:create_search_calendar", kwargs={'date': today}),{
            'title':'캘린더 테스트3', 
            'color':'red', 
            'important_mark': 'False',
            'start_date': '2022-1-1',
            'end_date': '2022-2-1'
        })
        response = self.client.get(reverse("calendar:search_calendar", kwargs={'month': today}))
        self.assertEqual(response.data[0]['title'], '캘린더 테스트1')
        self.assertEqual(response.data[0]['color'], 'blue')
        self.assertEqual(response.data[0]['important_mark'], False)
        self.assertEqual(response.data[0]['start_date'], '2022-11-01')
        self.assertEqual(response.data[0]['end_date'], '2022-12-01')
        self.assertEqual(response.data[1]['title'], '캘린더 테스트2')
        self.assertEqual(response.data[1]['color'], 'red')
        self.assertEqual(response.data[1]['important_mark'], False)
        self.assertEqual(response.data[1]['start_date'], '2022-11-01')
        self.assertEqual(response.data[1]['end_date'], '2022-12-01')
        self.assertEqual(response.status_code, status.HTTP_200_OK)