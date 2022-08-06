from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Chat
from .serializers import ChatSerializer


@api_view(['GET'])
def get_chat_id(request, username):
  receiver = request.session['user']['username']
  chat = Chat.objects.filter(chat_user__username=username).filter(
      chat_user__username=receiver)

  serializer = ChatSerializer(chat.first())

  return Response({'status': 200, 'data': serializer.data})


@api_view(['GET'])
def get_chat(request, chat_id):
  try:
    chat = Chat.objects.get(chat_id=chat_id)
    serializer = ChatSerializer(chat)

    return Response({'status': 200, 'data': serializer.data})
  except:
    return Response({'status': 404})
