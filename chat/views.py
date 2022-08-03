from rest_framework.decorators import api_view
from rest_framework.response import Response
from user.models import Account
from .models import Chat, Message
from .serializers import ChatSerializer, MessageSerializer
import uuid


@api_view(['POST'])
def create_chat(request):
  sender = request.data['username']
  receiver = request.session['user']['username']

  # Create new chat
  chat_id = uuid.uuid4().int & (1 << 64)-1
  chat = Chat(chat_id=chat_id)
  chat.save()

  # Add users to new chat
  sender_account = Account.objects.get(username=sender)
  receiver_account = Account.objects.get(username=receiver)

  chat.chat_user.add(sender_account)
  chat.chat_user.add(receiver_account)

  chat.save()

  return Response({'status': 200})


@api_view(['GET'])
def get_chat_id(request, username):
  receiver = request.session['user']['username']
  chat = Chat.objects.filter(chat_user__username=username).filter(
      chat_user__username=receiver)

  serializer = ChatSerializer(chat.first())

  return Response({'status': 200, 'data': serializer.data})


@api_view(['GET'])
def get_chat(request, chat_id):
  chat = Chat.objects.get(chat_id=chat_id)
  serializer = ChatSerializer(chat)

  return Response({'status': 200, 'data': serializer.data})
