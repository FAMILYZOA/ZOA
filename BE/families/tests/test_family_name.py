from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status

class TestCaseSetUp(APITestCase)  :
    def authenticate(self) :
        self.client.post(reverse("accounts:signup"),{"phone":"01046509260","name":"김조아","password":"Password123!","birth":"1999-11-11"})
        response=self.client.post(reverse('accounts:login'),{"phone":"01046509260","password":"Password123!"})
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {response.data['token']['access']}")
        response = self.client.post(reverse('families:family'),{"name":'family'})
        family_id = response.data['id']
        self.client.post(reverse("accounts:signup"),{"phone":"01046509261","name":"이조아","password":"Password123!","birth":"1999-11-11"})
        response=self.client.post(reverse('accounts:login'),{"phone":"01046509261","password":"Password123!"})
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {response.data['token']['access']}")
        get_user = self.client.get(reverse('accounts:profile'))
        self.client.post(reverse('families:join_family',kwargs={'family_id':family_id}))

class UserNameSetTestCase(TestCaseSetUp) :

    def test_1_get_default_interaction_name(self) :
        self.authenticate()
        response = self.client.get(reverse('families:info',kwargs={'id':8}))
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.assertEqual(response.data['users'][0]['set_name'],False)
        self.assertEqual(response.data['users'][1]['set_name'],'나')

    def test_2_set_interaction_name(self) :
        self.authenticate()
        response = self.client.post(reverse('families:name_set',kwargs={'id':28}),{'name':'아빠'})
        self.assertEqual(response.status_code,status.HTTP_201_CREATED)
        self.assertEqual(response.data['to_user'],28)
        self.assertEqual(response.data['name'],'아빠')
        get_user = self.client.get(reverse('accounts:profile'))
        self.assertEqual(response.data['from_user'],get_user.data['id'])
        
    def test_3_set_interaction_name_self(self) :
        self.authenticate()
        get_user = self.client.get(reverse('accounts:profile'))
        user_id = get_user.data['id']
        response = self.client.post(reverse('families:name_set',kwargs={'id':user_id}),{'name':'나는나다'})
        self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data,{'자신의 이름은 설정할 수 없습니다.'})

    def test_4_edit_interaction_name_self(self) :
        self.authenticate()
        self.client.post(reverse('families:name_set',kwargs={'id':32}),{'name':'아빠'})
        response = self.client.put(reverse('families:name_set',kwargs={'id':32}),{'name':'아저씨'})
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.assertEqual(response.data['name'],'아저씨')

    def test_5_set_interaction_name_again(self) :
        self.authenticate()
        response = self.client.post(reverse('families:name_set',kwargs={'id':34}),{'name':'아저씨'})
        response = self.client.post(reverse('families:name_set',kwargs={'id':34}),{'name':'아저씨!!'})
        self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data,{'이미 김조아님의 이름을 설정했습니다. 이름 수정만 가능합니다.'})