from django.urls import path

from scrums.views import ScrumAPIView,MainScrumAPIView, ScrumDetailUpdateAPIView,CommentCreateAPIView,CommentUpdateDeleteAPIView

app_name = 'scrums'

urlpatterns = [
    path('',ScrumAPIView.as_view(),name='scrum'),
    path('main/',MainScrumAPIView.as_view(),name='main_scrum'),
    path('<int:id>/',ScrumDetailUpdateAPIView.as_view(),name='detail'),
    path('comment/<int:id>/',CommentCreateAPIView.as_view(),name='comment'),
    path('<int:id>/comment/',CommentUpdateDeleteAPIView.as_view(),name='comment_ud'),
]
