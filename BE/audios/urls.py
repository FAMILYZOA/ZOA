from django.urls import path
from audios.views import AudioSaveAPIView

app_name = 'audios'

urlpatterns = [

    path("", AudioSaveAPIView.as_view(), name="audio-upload"),
    # path('<int:id>/',AudioRetriveDeleteView.as_view(),name='audio_detail')
]
