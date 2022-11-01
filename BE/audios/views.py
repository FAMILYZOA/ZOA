from accounts.models import User
from audios.serializers import AudioSerializer
from rest_framework.generics import (CreateAPIView)
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from rest_framework.parsers import MultiPartParser


class AudioSaveAPIView(CreateAPIView):
    serializer_class = AudioSerializer
    permission_classes = (permissions.IsAuthenticated,)
    parser_classes = [MultiPartParser, ]

    def post(self, request, *args, **kwargs):
        file_obj = request.data
        print(request.data)
        print(type(request.data['to_user_id']))
        print(len(request.data['to_user_id']))
        serializer = AudioSerializer(data=file_obj)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Actual place where we save it to the MEDIA_ROOT (cloud or other)
        serializer.save(from_user_id=self.request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)