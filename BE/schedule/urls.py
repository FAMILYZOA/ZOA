from django.urls import path, register_converter
from .converters import DateConverter
from schedule.views import (
    CreateSearchScheduleAPIView,
    DetailModifyDeleteScheduleAPIView,
)

register_converter(DateConverter, 'date')

app_name = 'calendar'

urlpatterns = [
    # 전체 일정 조회 / 일정 등록
    path('<date:date>', CreateSearchScheduleAPIView.as_view(), name="create_search_calendar"),
    # 일정 상세 조회 / 일정 수정 / 일정 삭제
    path('<int:schedule_id>', DetailModifyDeleteScheduleAPIView.as_view(),name='detail_modify_delete_calendar'),
]
