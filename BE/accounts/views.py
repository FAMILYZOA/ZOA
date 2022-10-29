from .models import User
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView, UpdateAPIView,RetrieveUpdateAPIView,CreateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import ErrorDetail 
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework.parsers import MultiPartParser
from .serializers import (
    KaKaoLoginSerializer,
    KaKaoSignupSerializer,
    SignupSerializer,
    LoginSerializer,
    RefreshTokenSerializer,
    ProfileSerializer,
    ChangePasswordSerializer,
    )

# 회원가입
class SignupAPIView(GenericAPIView):
    permission_classes = [ AllowAny ]
    serializer_class = SignupSerializer
    @swagger_auto_schema(
        operation_summary="회원가입",
        responses={
        "400": openapi.Response(
        description="Signup 400 Exception",
        examples={
            "application/json": {
                "휴대폰 번호 중복": {'phone': [ErrorDetail(string='사용자의 휴대폰 번호은/는 이미 존재합니다.', code='unique')]},
                "휴대폰 번호에 문자열 포함":{'non_field_errors': [ErrorDetail(string='휴대폰 번호는 숫자 형식이어야 합니다.', code='invalid')]} ,
                "비밀번호 정규식 불일치":{'non_field_errors': [ErrorDetail(string='비밀번호는 숫자, 대/소문자, 특수문자를 사용해야 합니다.', code='regex')]} ,
                "비밀번호 제한 숫자 불일치": {'password': [ErrorDetail(string='이 필드의 글자 수가  적어도 8 이상인지 확인하십시오.', code='min_length')]},
            }
        }
    )
    })
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 로그인
"""
1. 클라이언트는 LoginApi를 호출하면서 {"phone": "이름", "password": "비번"} 정보를 전달해준다.
2. 서버는 phone과 password를 가지고, 해당하는 유저를 찾은 다음 jwt_login을 수행한다.
3. jwt_login에서는 access_token과 refresh_token을 생성한다.
4. 생성된 access_token은 {"access_token": access_token}형태의 json으로 클라이언트에 전달되고, 
   생성된 refresh_token은 httpOnly=True 속성을 가진채로 cookie에 삽입된다.
"""
class LoginAPIView(GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [ AllowAny ]
    @swagger_auto_schema(operation_summary="로그인")
    def post(self, request):
        phone = request.data.get('phone',None)
        password = request.data.get('password',None)
        if phone is None or not phone:
            return Response({'phone':"휴대폰 번호를 입력하세요"},status=status.HTTP_400_BAD_REQUEST)
        if password is None  or not password:
            return Response({'password':"비밀번호를 입력하세요"},status=status.HTTP_400_BAD_REQUEST)
        user = authenticate( 
            phone=phone, 
            password=password
        )
        if user:
            login_serializer = self.serializer_class(user)
            token = TokenObtainPairSerializer.get_token(user)
            refresh_token = str(token)
            access_token = str(token.access_token)
            response = Response(
                {
                    "user": login_serializer.data,
                    "token": {
                        "access": access_token,
                        "refresh": refresh_token,
                    },
                },
                status=status.HTTP_200_OK,
            )
            return response
        if user is None:
            return Response({'login':"로그인에 실패했습니다."}, status=status.HTTP_400_BAD_REQUEST)


# 로그아웃
"""
1. 클라이언트에서 LogoutApi를 호출한다.
2. 호출과 동시에 클라이언트는 가지고 있던 access_token을 삭제한다. <- FE에서 처리
3. 서버에서는 cookie에 존재하는 refreshtoken을 삭제한다. <- BE에서 처리
"""
class LogoutAPIView(GenericAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = RefreshTokenSerializer
    @swagger_auto_schema(operation_summary="로그아웃")
    def post(self, request, *args):
        sz = self.get_serializer(data=request.data)
        sz.is_valid(raise_exception=True)
        sz.save()
        return Response("로그아웃 되었습니다.", status=status.HTTP_204_NO_CONTENT)


# 회원정보 수정/조회
class ProfileAPIView(RetrieveUpdateAPIView):
    # permission_classes = (IsAuthenticated,)
    serializer_class = ProfileSerializer
    parser_classes = (MultiPartParser,)
    queryset = User.objects.all()
    def get_object(self, queryset=None):
        obj = self.request.user
        return obj
    @swagger_auto_schema(operation_summary="회원정보 조회")
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)
    @swagger_auto_schema(operation_summary="회원정보 수정")
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
# 비밀번호 재설정/변경
class PasswordAPIView(UpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = ChangePasswordSerializer
    @swagger_auto_schema(operation_summary="비밀번호 변경")
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

class KaKaoSignupAPIView(GenericAPIView):
    permission_classes = [ AllowAny ]
    serializer_class = KaKaoSignupSerializer
    parser_classes = (MultiPartParser,)

    @swagger_auto_schema(operation_summary="카카오 회원가입")
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class KaKaoLoginAPIView(CreateAPIView) :
    permission_classes = [ AllowAny ]
    serializer_class = KaKaoLoginSerializer

    def get_object(self):
        if User.objects.filter(kakao_id=self.request.data['kakao_id']) :
            return User.objects.get(kakao_id=self.request.data['kakao_id'])
        return None

    @swagger_auto_schema(operation_summary="카카오 로그인",
        operation_description=
        """
        카카오에서 인증(200)이 된 유저면 클라이언트를 임의의 페이지로 보낸다.
         임의의 페이지에서 유저 정보를 받아온다. 
         유저 정보 중 카카오 id를 담아서 accounts/kakao에 보낸다.
         201 응답이 뜨면, 클라이언트를 메인페이지로 redirect
         401 응답이 뜨면, 클라이언트를 카카오 회원가입 페이지로 redirect
        """)
    def post(self,request) :

        user = self.get_object()
        if not user :
            return Response({'카카오 회원가입이 필요합니다.'},status=status.HTTP_401_UNAUTHORIZED)
        token = TokenObtainPairSerializer.get_token(user)
        refresh_token = str(token)
        access_token = str(token.access_token)
        response = Response(
            {
                "user": {
                    'id' : user.id ,
                    "phone" : user.phone
                },
                "token": {
                    "access": access_token,
                    "refresh": refresh_token,
                },
            },
            status=status.HTTP_200_OK,
        )
        return response