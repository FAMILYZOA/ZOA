from django.urls import path

from families.views import FamilyCreateAPIView

app_name = 'families'

urlpatterns = [


    path('', FamilyCreateAPIView.as_view(), name="family"),
]
