from django.urls import path
from audios.views import AudioUpdateAPIView, AudioSaveAPIView, AudioDeleteAPIView

app_name = 'audios'

urlpatterns = [

    path("", AudioSaveAPIView.as_view(), name="upload"),
    path('<int:id>/',AudioUpdateAPIView.as_view(),name='update'),
    path('delete/',AudioDeleteAPIView.as_view(),name='delete')

]
