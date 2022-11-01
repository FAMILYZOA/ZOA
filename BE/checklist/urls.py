from django.urls import path
from .views import (
    DdayAPIView,
    ChecklistCreateAPIView, 
    ChecklistSearchAPIView, 
    ChecklistDetailAPIView,
    ChecklistTodayCreateAPIView,
    ChecklistTodayFinish,
    ChecklistUnFinish,
    ChecklistFinish,
)

app_name = 'checklist'

urlpatterns = [
    # D-day
    path('Dday', DdayAPIView.as_view(), name="Dday"),

    # 체크리스트 작성
    path('', ChecklistCreateAPIView.as_view(), name="checklistcreate"),
    # 유저별 체크리스트 전체 조회
    path('<int:to_users_id>', ChecklistSearchAPIView.as_view(), name="checklistsearch"),
    # 오늘 생성된 체크리스트 전체 조회
    path('<int:to_users_id>/todaycreate', ChecklistTodayCreateAPIView.as_view(), name="checklisttoday"),
    # 오늘 완료한 체크리스트 조회
    path('<int:to_users_id>/todayfinish', ChecklistTodayFinish.as_view(), name="checklisttodayfinish"),
    # 완료안된 체크리스트 조회
    path('<int:to_users_id>/unfinish', ChecklistUnFinish.as_view(), name="checklistunfinish"),
    # 완료한 체크리스트 조회
    path('<int:to_users_id>/finish', ChecklistFinish.as_view(), name="checklistfinish"),
    # 체크리스트 상세조회 & 수정 & 삭제
    path('detail/<int:checklist_id>', ChecklistDetailAPIView.as_view(), name="checklistupdatedelete"),
]