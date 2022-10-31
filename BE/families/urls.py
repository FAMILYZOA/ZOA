from django.urls import path
from families import views
from families.views import FamilyAPIView, FamilyCreateAPIView

app_name = 'families'

urlpatterns = [
    path('', FamilyCreateAPIView.as_view(), name="family"),
    path('<int:id>',FamilyAPIView.as_view(),name='family_info'),
    path('sign/<int:family_id>',views.UserJoinFamily,name='join_family')
]
