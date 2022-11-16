from django.urls import path
from families import views
from families.views import (
    FamilyAPIView, 
    FamilyCreateAPIView, 
    FamilyNameSetAPIView, 
    FamilySignAPIView, 
    InviteCodeFamilyAPIView, 
    InviteCodeSignFamilyAPIView,
    FamilySecessionAPIView
)

app_name = 'families'

urlpatterns = [
    path('', FamilyCreateAPIView.as_view(), name="family"),
    path('<int:id>/',FamilyAPIView.as_view(),name='info'),
    path('sign/<int:family_id>/',views.UserJoinFamily,name='join_family'),
    path('get/<int:id>/',views.FamilySignAPIView.as_view(),name='get_family'),
    path('name/<int:id>/',FamilyNameSetAPIView.as_view(),name='name_set'),
    path('secession/',FamilySecessionAPIView.as_view(),name='secession_family'),
    
    # 초대 url
    path('invitation_code/<int:family_id>/', InviteCodeFamilyAPIView.as_view(),name='invite'),

    # 초대 코드 입력 가족 가입 url
    path('invitation_code/sign/', InviteCodeSignFamilyAPIView.as_view(),name='invite'),

]
