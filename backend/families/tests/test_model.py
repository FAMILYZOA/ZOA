from rest_framework.test import APITestCase
from families.models import Family,FamilyInteractionName
from accounts.models import User
from django.db import DataError

#모델 생성 테스트 
class FamilyCreateTestModel(APITestCase) :
    
    def test_family_success_create(self) :
        user = User.objects.create_user('01000000000','password123!@#','김조아',birth='1997-11-19')
        family = Family.objects.create(name='Family')
        family.users.add(user)
        self.assertIsInstance(family,Family)
        self.assertEqual(family.name,'Family')
        self.assertTrue(user in family.users.all(),True)
    #가족 모델 생성 시 이름 제약을 위반 
    def test_family_invalid_character_length_create(self) :
        family = Family(name='FamilyFamilyFamily')
        with self.assertRaises(Exception) as raised :
            family.save()
        self.assertEqual(DataError,type(raised.exception))

class FamilyNameCreateTestModel(APITestCase) :
    #가족 간 상호 이름 설정 
    def test_family_interaction_name_success_create(self) :
        user1 = User.objects.create_user('01000000000','password123!@#','김조아',birth='1997-11-19')
        user2= User.objects.create_user('01000000001','password123!@#','이조아',birth='1997-11-19')
        self.assertIsInstance(user1,User)
        self.assertIsInstance(user2,User)
        family = Family.objects.create(name='Family')
        family.users.add(user1)
        family.users.add(user2)
        family_name = FamilyInteractionName.objects.create(to_user=user1,from_user=user2,name='tmp',family=family)
        self.assertIsInstance(family_name,FamilyInteractionName)
        self.assertTrue(family_name.name,'tmp')
        self.assertTrue(family_name.to_user,user1)
        self.assertTrue(family_name.name,user2) 
        

