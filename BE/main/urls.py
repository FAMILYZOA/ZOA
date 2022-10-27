from django.urls import path
from .views import (
    DdayAPIView,
    ChecklistCreateAPIView, 
    ChecklistSearchAPIView, 
    ChecklistUpdateDeleteAPIView
)

app_name = 'main'

urlpatterns = [
    # D-day
    path('Dday', DdayAPIView.as_view(), name="Dday"),
    # 체크리스트 작성
    path('checklist', ChecklistCreateAPIView.as_view(), name="checklistcreate"),
    # 체크리스트 조회
    path('checklist/{toUserPK}', ChecklistSearchAPIView.as_view(), name="checklistsearch"),
    # 체크리스트 수정 및 삭제
    path('checklist/{checklistPK}', ChecklistUpdateDeleteAPIView.as_view(), name="checklistupdatedelete"),
]
