from rest_framework.test import APITestCase
from accounts.models import User 

#모델 생성 테스트 
class UserCreateTestModel(APITestCase) :

    #유저 객체 생성 
    def test_create_user(self) :
        user = User.objects.create_user('01000000000','password123!@#','김조아')

        #user가 만들어졌는가 
        self.assertIsInstance(user,User)
        #user가 스태프가 아닌가 
        self.assertFalse(user.is_staff)
        #phone 번호가 일치하는가 
        self.assertEqual(user.phone,'01000000000')

    #관리자 유저 객체 생성 
    def test_creates_super_user(self) :
    
        user = User.objects.create_superuser('01000000000','password123!@#','김조아')
        
        self.assertIsInstance(user,User) 
        self.assertTrue(user.is_staff) 
        self.assertEqual(user.phone,'01000000000') 
        self.assertEqual(user.name,'김조아')

#필수 조건 미입력 오류 테스트
class UserBlankTestModel(APITestCase) :
    #이름 미입력 오류 테스트
    def test_raise_error_when_no_name_is_supplied(self) :
        self.assertRaises(ValueError,
        User.objects.create_user,phone='01000000001',password='password123!@#',name='')

        self.assertRaisesMessage(ValueError,'The name must be set',
        User.objects.create_user,phone='01000000001',password='password123!@#',name='')

    #전화번호 미입력 오류 테스트
    def test_raise_error_when_no_phone_is_supplied(self) :
        self.assertRaises(ValueError,
        User.objects.create_user,phone='',password='password123!@#',name='김조아')

        self.assertRaisesMessage(ValueError,'The Phone number must be set',
        User.objects.create_user,phone='',password='password123!@#',name='김조아')

    #패스워드 미입력 오류 테스트
    def test_raise_error_when_no_password_is_supplied(self) :
        self.assertRaises(ValueError,
        User.objects.create_user,phone='01000000001',password='',name='김조아')

        self.assertRaisesMessage(ValueError,'The password must be set',
        User.objects.create_user,phone='01000000001',password='',name='김조아')
