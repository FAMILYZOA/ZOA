from django.urls import path
from audios.views import AudioDeleteAPIView, AudioSaveAPIView

app_name = 'audios'

urlpatterns = [

    path("", AudioSaveAPIView.as_view(), name="upload"),
    path('<int:id>/',AudioDeleteAPIView.as_view(),name='delete')
]
