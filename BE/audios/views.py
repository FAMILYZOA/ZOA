from accounts.models import User
from accounts.permissions import IsFamilyorBadResponsePermission, IsObjectorBadResponsePermission
from audios.models import Audio
from audios.serializers import AudioListSerializer, AudioSerializer, AudioUpdateSerializer
from rest_framework.generics import (ListCreateAPIView,GenericAPIView)
from rest_framework import mixins
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser
from drf_yasg.utils import swagger_auto_schema
from rest_framework import permissions
from rest_framework.filters import SearchFilter
from drf_yasg import openapi



audio_param = openapi.Parameter('type', openapi.IN_QUERY, description="조회할 데이터 종류를 입력해주세요", type=openapi.TYPE_INTEGER,required=True)


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
    
    @swagger_auto_schema(operation_summary="음성메시지 리스트 조회",manual_parameters=[audio_param],operation_description='전체를 조회하려면 0, 저장한 음성은 1을 입력해주세요')
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
    def list(self,request, *args,**kwagrs) :
        is_query  =self.request.GET.getlist('type')
        if not is_query  :
            return Response('query를 입력해주세요 0 or 1',status=status.HTTP_400_BAD_REQUEST)
        if request.GET['type'] == '1' :
            queryset = Audio.objects.filter(to_user_id=request.user,status=True).order_by('-pk')
        else :
            queryset = Audio.objects.filter(to_user_id=request.user).order_by('-pk')
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class AudioUpdateAPIView(GenericAPIView,mixins.UpdateModelMixin) :
    permission_classes = [IsObjectorBadResponsePermission,]
    queryset = Audio.objects.all()
    lookup_field = 'id'
    serializer_class = AudioUpdateSerializer

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)


class AudioDeleteAPIView(GenericAPIView):
    permission_classes = [IsObjectorBadResponsePermission,]
    def delete(self, request):
        audio = Audio.objects.filter(id__in=request.data.getlist('id'))
        audio.delete()
        return Response("삭제되었습니다.", status=status.HTTP_204_NO_CONTENT)
