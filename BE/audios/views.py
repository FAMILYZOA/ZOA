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


class AudioSaveAPIView(ListCreateAPIView):
    serializer_class = AudioListSerializer
    permission_classes = [IsFamilyorBadResponsePermission,]
    parser_classes = [MultiPartParser, ]
    filter_backends = [SearchFilter,]
    search_fields = ['status']
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
        is_query  =self.request.GET.getlist('search')
        if not is_query  :
            return Response('query를 입력해주세요 0 or 1',status=status.HTTP_400_BAD_REQUEST)
        queryset = self.filter_queryset(Audio.objects.filter(to_user_id=request.user).order_by('created_at'))
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class AudioDeleteAPIView(GenericAPIView,mixins.UpdateModelMixin,mixins.DestroyModelMixin,) :
    permission_classes = [IsObjectorBadResponsePermission,]
    queryset = Audio.objects.all()
    lookup_field = 'id'
    serializer_class = AudioUpdateSerializer

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)