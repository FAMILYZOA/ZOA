from rest_framework.response import Response
from rest_framework.generics import GenericAPIView

# TODO : 캘린더 app의 model 만든 후 개발
class DdayAPIView(GenericAPIView):
    def get(self, request):
        return Response("")


class ChecklistCreateAPIView(GenericAPIView):
    def post(self, request):
        return Response("")


class ChecklistSearchAPIView(GenericAPIView):
    def get(self, request):
        return Response("") 


class ChecklistUpdateDeleteAPIView(GenericAPIView):
    def put(self, request):
        return Response("")

    def delete(self, request):
        return Response("")         