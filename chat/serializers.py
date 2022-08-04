from rest_framework import serializers
from user.serializers import AccountSerializer
from .models import Chat, Message


class MessageSerializer(serializers.ModelSerializer):
  user_message = AccountSerializer()

  class Meta:
    model = Message
    fields = '__all__'


class ChatSerializer(serializers.ModelSerializer):
  chat_user = AccountSerializer(many=True)
  chat = MessageSerializer(many=True)

  class Meta:
    model = Chat
    fields = '__all__'
