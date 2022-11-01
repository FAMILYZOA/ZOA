from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from datetime import date
from rest_framework.exceptions import ErrorDetail

class TestCaseSetUp(APITestCase) :
    #기본 로그인 로직 
    def authenticate(self) :
        self.client.post(reverse("accounts:signup"),{"phone":"01046509260","name":"김조아","password":"Password123!","birth":"1999-11-11"})
        response=self.client.post(reverse('accounts:login'),{"phone":"01046509260","password":"Password123!"})
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {response.data['token']['access']}")
    def create_family(self) :
        global family_id
        self.authenticate()
        response = self.client.post(reverse('families:family'),{"name":'family'})
        family_id = response.data['id']
    def other_authenticate(self) :
        self.create_family()
        self.client.post(reverse("accounts:signup"),{"phone":"01046509261","name":"이조아","password":"Password123!","birth":"1999-11-11"})
        response=self.client.post(reverse('accounts:login'),{"phone":"01046509261","password":"Password123!"})
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {response.data['token']['access']}")

class FamliyCreateTestCase(TestCaseSetUp) :

    #성공적인 Family 생성 요청
    def test_1_family_success_create(self) :
        self.authenticate()
        response=self.client.post(reverse('families:family'),{"name":'family'})
        today = date.today()
        self.assertEqual('family',response.data['name'])
        self.assertEqual(today.strftime("%Y-%m-%d"),response.data['created_at'])
        self.assertEqual(response.status_code,status.HTTP_201_CREATED)

    #인증되지 않은 user의 post 요청 
    def test_2_family_not_autenticate_user_create(self) :
        response=self.client.post(reverse('families:family'),{"name":'family'})
        self.assertEqual(response.status_code,status.HTTP_401_UNAUTHORIZED)

    #성공적인 Family 생성 요청시 이름 규약 위반 
    def test_3_family_invalid_character_length_create(self) :
        self.authenticate()
        response=self.client.post(reverse('families:family'),{"name":'familyfamilyfamily'})
        exception = [ErrorDetail(string='이 필드의 글자 수가 13 이하인지 확인하십시오.', code='max_length')]
        self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['name'],exception)

class FamliyGetTestCase(TestCaseSetUp) :
    #가족 구성원이 정보 조회
    def test_1_family_get_info(self) :
        self.create_family()
        response = self.client.get(reverse('families:info',kwargs={'id':family_id}))
        self.assertEqual(response.status_code,status.HTTP_200_OK)

    #가족 구성원이 아닌 사람이 가족 조회
    def test_2_family_get_not_member(self) :
        self.other_authenticate()
        response = self.client.get(reverse('families:info',kwargs={'id':family_id}))
        self.assertEqual(response.status_code,status.HTTP_403_FORBIDDEN)

    #없는 가족 조회
    def test_3_family_get_not_found(self) :
        self.authenticate()
        response = self.client.get(reverse('families:info',kwargs={'id':family_id}))
        self.assertEqual(response.status_code,status.HTTP_404_NOT_FOUND)
    #가족 이름 변경
    def test_4_change_family_name(self) :
        self.create_family()
        response = self.client.put(reverse('families:info',kwargs={'id':family_id}),{"name":'family_edit'})
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.assertEqual(response.data['name'],'family_edit')
    #가족 삭제 
    def test_5_family_get_not_found(self) :
        self.create_family()
        response = self.client.delete(reverse('families:info',kwargs={'id':family_id}))
        self.assertEqual(response.status_code,status.HTTP_204_NO_CONTENT)
    

class FamliySignTestCase(TestCaseSetUp) :
    #가족 에 가입 
    def test_1_family_success_sign(self) :
        self.other_authenticate()
        response = self.client.post(reverse('families:join_family',kwargs={'family_id':family_id}))
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.assertEqual(response.data['success'],'이조아님이 family에 가입되었습니다.')
    #가족이 있을 때, 가입 요청 보낼 때
    def test_2_family_get_not_found(self) :
        self.create_family()
        response = self.client.post(reverse('families:join_family',kwargs={'family_id':family_id}))
        self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['fail'],'김조아님은 이미 가족에 가입되어 있습니다.')

