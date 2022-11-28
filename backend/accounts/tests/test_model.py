from django.db.backends.sqlite3.base import IntegrityError
from rest_framework.test import APITestCase
from accounts.models import User 
from django.core.exceptions import ValidationError
#모델 생성 테스트 
class UserCreateTestModel(APITestCase) :

    #유저 객체 생성 
    def test_create_user(self) :
        user = User.objects.create_user('01000000000','password123!@#','김조아',birth='1997-11-19')
        #user가 만들어졌는가 
        self.assertIsInstance(user,User)
        #user가 스태프가 아닌가 
        self.assertFalse(user.is_staff)
        #phone 번호가 일치하는가 
        self.assertEqual(user.phone,'01000000000')
        self.assertEqual(user.name,'김조아')
        self.assertEqual(user.birth,'1997-11-19')
        self.assertEqual(user.image,'user/profile/profile_default1.png')

    #관리자 유저 객체 생성 
    def test_creates_super_user(self) :
    
        user = User.objects.create_superuser('01000000000','password123!@#','김조아',birth='1997-11-19')
        
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
        User.objects.create_user,phone='01000000000',password='',name='김조아')

    #생년월일 미입력 오류 테스트 
    def test_raise_error_when_no_birth_is_suplied(self) :
        user= User(phone='01000000000',password='password123!@#',name='김조아')
        with self.assertRaises(Exception) as raised :
            user.save()
        self.assertEqual(IntegrityError,type(raised.exception))

#잘못된 입력 테스트 
class UserUnexpectedinput(APITestCase) :

    #휴대폰 번호 테스트 
    def test_raise_error_when_invalid_number(self) :
        #휴대폰 번호 9자리
        self.assertRaises(ValidationError,
        User.objects.create_user,phone='010000000',password='password123!@#',name='김조아',birth='1997-11-19')
        #휴대폰 번호 12자리 
        self.assertRaisesMessage(ValidationError,'The Phone number is 10 or 11 digits.',
        User.objects.create_user,phone='010000000000',password='password123!@#',name='김조아',birth='1997-11-19')
        #휴대폰 번호에 문자열 
        self.assertRaisesMessage(ValidationError,'The Phone number is in numerical form.',
        User.objects.create_user,phone='abcdefgh',password='password123!@#',name='김조아',birth='1997-11-19')
        # ['010','011','016','017','018','019']이 아닌 것으로 시작되는 휴대폰 번호 
        self.assertRaisesMessage(ValidationError,'The first three digits of the Phone number do not fit the format.',
        User.objects.create_user,phone='0200000000',password='password123!@#',name='김조아',birth='1997-11-19')
    
    def test_raise_error_when_invalid_name(self) :
        #한글자 이름 
        self.assertRaisesMessage(ValidationError,'Please enter a name with at least 2 characters',
        User.objects.create_user,phone='01000000000',password='password123!@#',name='김',birth='1997-11-19')
        #30글자를 초과한 이름 
        self.assertRaisesMessage(ValidationError,'Please enter a name of 30 characters or less',
        User.objects.create_user,phone='01000000000',password='password123!@#',name='김'*31,birth='1997-11-19')
        #이름에 공백 포함 
        self.assertRaisesMessage(ValidationError,'The name contains spaces. Please remove the space and save it again',
        User.objects.create_user,phone='01000000000',password='password123!@#',name='김 동완',birth='1997-11-19')
        #숫자가 포함된 이름 
        self.assertRaisesMessage(ValidationError,'The name must be a string.',
        User.objects.create_user,phone='01000000000',password='password123!@#',name='123',birth='1997-11-19')
    
    def test_raise_error_when_invalid_birth(self) :
        #잘못된 생년월일 형식 
        self.assertRaisesMessage(ValidationError,"'199-11-19' 값은  날짜 형식이 아닙니다. YYYY-MM-DD 형식이어야 합니다.",
            User.objects.create_user,phone='01000000000',password='password123!@#',name='김빵빵',birth='199-11-19')