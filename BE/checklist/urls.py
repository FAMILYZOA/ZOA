from django.urls import path
from .views import (
    DdayAPIView,
    ChecklistCreateAPIView, 
    ChecklistSearchAPIView, 
    ChecklistDetailAPIView,
    ChecklistTodayAPIView,
)

app_name = 'checklist'

urlpatterns = [
    # D-day
    path('Dday', DdayAPIView.as_view(), name="Dday"),

    # 체크리스트 작성
    path('', ChecklistCreateAPIView.as_view(), name="checklistcreate"),
    # 유저별 체크리스트 전체 조회
    path('<int:to_users_id>', ChecklistSearchAPIView.as_view(), name="checklistsearch"),
    # 해당 유저의 오늘 생성된 체크리스트 전체 조회
    path('<int:to_users_id>/today', ChecklistTodayAPIView.as_view(), name="checklisttoday"),
    # 체크리스트 상세조회 & 수정 & 삭제
    path('detail/<int:checklist_id>', ChecklistDetailAPIView.as_view(), name="checklistupdatedelete"),
]
