from urllib import response
from .models import User
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .serializers import (
    SignupSerializer,
    LoginSerializer,
    )


# 회원가입
class SignupAPIView(APIView):
    permission_classes = [ AllowAny ]

    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 로그인
class LoginAPIView(APIView):
    permission_classes = [ AllowAny ]

    def post(self, request):
        user_id = request.data.get('user_id')
        password = request.data.get('password')

        if user_id is None:
            return Response("아이디를 입력하세요.")

        if password is None:
            return Response("비밀번호를 입력하세요.")

        user = authenticate( 
            user_id=user_id, 
            password=password
        )

        if user:
            login_serializer = LoginSerializer(user)
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


# 회원정보 수정/조회
class ProfileAPIView(APIView):
    def get(self, request):
        return response("")

    def put(self, request):
        return response("")


# 비밀번호 재설정/변경
class PasswordAPIView(APIView):
    def post(self, request):
        return response("")

    def put(self, request):
        return response("")
