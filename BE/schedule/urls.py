from django.urls import path, register_converter
from .converters import DateConverter
from schedule.views import (
    SearchCalendarAPIView,
    CreateDetailCalendarAPIView,
    ModifyDeleteCalendarAPIView,
)

register_converter(DateConverter, 'date')

app_name = 'calendar'

urlpatterns = [
    # 전체 일정 조회
    path('', SearchCalendarAPIView.as_view(), name="search_calendar"),
    # 일정 등록 / 상세 조회
    path('<date:date>',CreateDetailCalendarAPIView.as_view(),name='create_detail_calendar'),
    # 일정 수정 / 삭제
    path('<date:date>/<int:schedule_id>',ModifyDeleteCalendarAPIView.as_view(),name='modify_delete_calendar'),
]
