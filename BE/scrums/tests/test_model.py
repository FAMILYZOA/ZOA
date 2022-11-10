from rest_framework.test import APITestCase
from families.models import Family
from accounts.models import User
from django.db import DataError
from scrums.models import Scrum

#모델 생성 테스트 
class ScrumyCreateTestModel(APITestCase) :
    
    def test_scrum_success_create(self) :
        user = User.objects.create_user('01000000000','password123!@#','김조아',birth='1997-11-19')
        family = Family.objects.create(name='Family')
        family.users.add(user)
        scrum = Scrum.objects.create(emoji='😚',yesterday='축구함',today='농구함',user=user,family=family)
        self.assertIsInstance(scrum,Scrum)
        self.assertEqual(scrum.emoji,'😚')
        self.assertEqual(scrum.yesterday,'축구함')
        self.assertEqual(scrum.today,'농구함')
        self.assertTrue(scrum in family.scrum.all(),True)