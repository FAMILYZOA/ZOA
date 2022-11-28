from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView, 
    TokenVerifyView,
)
from .views import (
    KaKaoLoginAPIView,
    KaKaoSignupAPIView,
    SignupAPIView,
    LoginAPIView,
    LogoutAPIView,
    ProfileAPIView,
    PasswordAPIView,
    PhonecheckAPIView,
)

app_name = 'accounts'

urlpatterns = [
    # 토큰 갱신
    path('token_refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # 토큰 검증
    path('token_verify/', TokenVerifyView.as_view(), name='token_verify'),
    
    # 휴대폰 중복 체크
    path('phonecheck/', PhonecheckAPIView.as_view(), name="phonecheck"),
    # 회원가입
    path('signup/', SignupAPIView.as_view(), name="signup"),
    # 로그인
    path('login/', LoginAPIView.as_view(), name="login"),
    # 로그아웃
    path('logout/', LogoutAPIView.as_view(), name="logout"),
    # 회원정보 수정/조회
    path('profile/', ProfileAPIView.as_view(), name="profile"),
    # 비밀번호 재설정/변경
    path('password/', PasswordAPIView.as_view(), name="password"),
    path('kakao/', KaKaoLoginAPIView.as_view(), name="kakao"),
    path('kakao/sign/', KaKaoSignupAPIView.as_view(), name="kakao_signup"),

]
