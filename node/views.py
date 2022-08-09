from rest_framework.response import Response
from rest_framework.decorators import api_view


@api_view(['POST'])
def create_node(request):
  return Response({'status': 200})
