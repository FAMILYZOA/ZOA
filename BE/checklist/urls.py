from django.urls import path
from .views import (
    DdayAPIView,
    ChecklistCreateAPIView, 
    ChecklistSearchAPIView, 
    ChecklistDetailAPIView,
)

app_name = 'checklist'

urlpatterns = [
    # D-day
    path('Dday', DdayAPIView.as_view(), name="Dday"),

    # 체크리스트 유저별 전체 조회
    path('<int:to_user_id>', ChecklistSearchAPIView.as_view(), name="checklistsearch"),
    # 체크리스트 작성
    path('', ChecklistCreateAPIView.as_view(), name="checklistcreate"),
    # 체크리스트 상세조회 & 수정 & 삭제
    path('change/<int:checklist_id>', ChecklistDetailAPIView.as_view(), name="checklistupdatedelete"),
]
