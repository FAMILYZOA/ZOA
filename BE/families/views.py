from django.shortcuts import render
from rest_framework.generics import (
    CreateAPIView,GenericAPIView,mixins)

from families.models import Family
from .serializers import FamilySerializer
from rest_framework.response import Response


class FamilyCreateAPIView(CreateAPIView) :
    serializer_class = FamilySerializer
    queryset = Family.objects.all()
    def post(self, request, *args, **kwargs):
        print(request.user)
        return self.create(request, *args, **kwargs)


    







