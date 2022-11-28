from django.urls import path, register_converter
from .converters import DateConverter, MonthConverter
from schedule.views import (
    SearchSDdayAPIView,
    SearchScheduleAPIView,
    CreateSearchScheduleAPIView,
    DetailModifyDeleteScheduleAPIView,
)

register_converter(DateConverter, 'date')
register_converter(MonthConverter, 'month')

app_name = 'calendar'

urlpatterns = [
    # D-Day
    path('Dday/<date:date>', SearchSDdayAPIView.as_view(), name="search_Dday"),
    # 월별 일정 조회
    path('schedule/<month:month>', SearchScheduleAPIView.as_view(), name="search_calendar"),
    # 해당 일정 조회 / 일정 등록
    path('schedule/date/<date:date>', CreateSearchScheduleAPIView.as_view(), name="create_search_calendar"),
    # 일정 상세 조회 / 일정 수정 / 일정 삭제
    path('schedule/detail/<int:schedule_id>', DetailModifyDeleteScheduleAPIView.as_view(),name='detail_modify_delete_calendar'),
]
