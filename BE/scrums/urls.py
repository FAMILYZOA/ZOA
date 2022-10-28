from django.urls import path

from scrums.views import ScrumAPIView

app_name = 'scrums'

urlpatterns = [
    path('',ScrumAPIView.as_view(),name='scrum'),
]
