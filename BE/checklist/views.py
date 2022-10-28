from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from .serializers import ChecklistSerializer, ChecklistDetailSerializer, ChecklistStateChangeSerializer, ChecklistCreateSerializer
from .models import Checklist


class DdayAPIView(GenericAPIView):
    # TODO : 캘린더 app의 model 만든 후 개발
    def get(self, request):
        return Response("")


class ChecklistSearchAPIView(GenericAPIView):
    serializer_class = ChecklistSerializer
    def get(self, request, to_user_id):
        checklist = Checklist.objects.filter(to_user_id__exact=to_user_id)
        serializer = self.serializer_class(checklist, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK) 


class ChecklistCreateAPIView(GenericAPIView):
    # TODO: Checklist 부여할 때 같은 가족방에 속한 사람에게만 부여할 수 있도록하기

    serializer_class = ChecklistCreateSerializer
    def post(self, request):
        context = {
            'text': request.data.get('text'),
            'to_user_id': request.data.get('to_user_id'),
            'from_user_id': request.user.id,
        }
        serializer = ChecklistDetailSerializer(data=context)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChecklistDetailAPIView(GenericAPIView):
    get_serializer_class = ChecklistDetailSerializer
    def get(self, request, checklist_id):
        checklist = Checklist.objects.get(id=checklist_id)
        serializer = self.get_serializer_class(checklist)
        return Response(serializer.data, status=status.HTTP_200_OK) 


    serializer_class = ChecklistStateChangeSerializer
    def put(self, request, checklist_id):
        checklist = Checklist.objects.get(id=checklist_id)
        serializer = self.put_serializer_class(checklist, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, checklist_id):
        checklist = get_object_or_404(Checklist, id=checklist_id)
        if request.user.pk == checklist.from_user_id.id:
            checklist.delete()
            return Response("해당 Todo를 삭제하였습니다.", status=status.HTTP_200_OK)     
        return Response("Todo 부여자가 아닙니다.", status=status.HTTP_400_BAD_REQUEST)
