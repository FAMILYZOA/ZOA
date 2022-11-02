from accounts.models import User
from audios.serializers import AudioSerializer
from rest_framework.generics import (CreateAPIView)
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from rest_framework.parsers import MultiPartParser
from drf_yasg.utils import swagger_auto_schema

class AudioSaveAPIView(CreateAPIView):
    serializer_class = AudioSerializer
    permission_classes = (permissions.IsAuthenticated,)
    parser_classes = [MultiPartParser, ]

    @swagger_auto_schema(request_body=AudioSerializer)
    def post(self, request, *args, **kwargs):

        if len(request.data['to_user_id'])> 1 and ',' in request.data['to_user_id'] :
            try :
                request.data.setlist('to_user_id', list(map(int,request.data['to_user_id'].split(','))))
            except :
                Response({'잘못된 요청입니다.'},status=status.HTTP_400_BAD_REQUEST)
        serializer = AudioSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Actual place where we save it to the MEDIA_ROOT (cloud or other)
        serializer.save(from_user_id=self.request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)