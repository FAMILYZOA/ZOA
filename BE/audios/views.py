from accounts.models import User
from audios.models import Audio
from audios.serializers import AudioListSerializer, AudioSerializer
from rest_framework.generics import (ListCreateAPIView)
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser
from drf_yasg.utils import swagger_auto_schema
from scrums.views import IsFamilyorBadResponsePermission


class AudioSaveAPIView(ListCreateAPIView):
    serializer_class = AudioListSerializer
    permission_classes = [IsFamilyorBadResponsePermission,]
    parser_classes = [MultiPartParser, ]

    @swagger_auto_schema(request_body=AudioSerializer)
    def post(self, request, *args, **kwargs):

        if len(request.data['to_user_id'])> 1 and ',' in request.data['to_user_id'] :
            try :
                request.data.setlist('to_user_id', list(map(int,request.data['to_user_id'].split(','))))
            except :
                Response({'잘못된 요청입니다.'},status=status.HTTP_400_BAD_REQUEST)
        
        member = request.data.getlist('to_user_id')
        giver = request.user.family_id.id
        for id in member:
            man = User.objects.get(id=id)
            if request.user ==man :
                return Response({'자신에게 메시지를 보낼 수 없습니다.'},status=status.HTTP_403_FORBIDDEN)
            if not man.family_id or giver != man.family_id.id  :
                context = {
                    f'{man}님은 해당 가족이 아닙니다.'
                }
                return Response(context, status=status.HTTP_403_FORBIDDEN)

        serializer = AudioSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Actual place where we save it to the MEDIA_ROOT (cloud or other)
        serializer.save(from_user_id=self.request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def list(self,request, *args,**kwagrs) :
        queryset = Audio.objects.filter(to_user_id=self.request.user)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
