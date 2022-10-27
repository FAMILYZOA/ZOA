from urllib import response
from .models import User
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView, UpdateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from .serializers import (
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
    @swagger_auto_schema(responses={
        "400": openapi.Response(
        description="Signup 400 Exception",
        examples={
            "application/json": {
                "phone": "핸드폰 번호가 존재합니다.",
                "password": "비밀번호는 숫자, 대/소문자, 특수문자를 사용해야 합니다.",
            }
        }
    )})
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
    def post(self, request):
        phone = request.data.get('phone')
        password = request.data.get('password')
        if phone is None:
            return Response("아이디를 입력하세요.")
        if password is None:
            return Response("비밀번호를 입력하세요.")
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
            return Response("로그인에 실패하였습니다.", status=status.HTTP_400_BAD_REQUEST)


# 로그아웃
"""
1. 클라이언트에서 LogoutApi를 호출한다.
2. 호출과 동시에 클라이언트는 가지고 있던 access_token을 삭제한다. <- FE에서 처리
3. 서버에서는 cookie에 존재하는 refreshtoken을 삭제한다. <- BE에서 처리
"""
class LogoutAPIView(GenericAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = RefreshTokenSerializer

    def post(self, request, *args):
        sz = self.get_serializer(data=request.data)
        sz.is_valid(raise_exception=True)
        sz.save()
        return Response("로그아웃 되었습니다.", status=status.HTTP_204_NO_CONTENT)


# 회원정보 수정/조회
class ProfileAPIView(GenericAPIView):
    # permission_classes = (IsAuthenticated,)
    serializer_class = ProfileSerializer

    def get(self, request):
        serializer = self.serializer_class(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request):
        serializer_data = request.data
        serializer = self.serializer_class(
            request.user, data=serializer_data, partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)


# 비밀번호 재설정/변경
class PasswordAPIView(UpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = ChangePasswordSerializer
    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def post(self, request):
        return response()

    def put(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                "성공적으로 변경되었습니다."
            }
            return Response(response, status=status.HTTP_200_OK,)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
