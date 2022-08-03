from rest_framework import serializers
from user.serializers import AccountSerializer
from .models import Chat


class ChatSerializer(serializers.ModelSerializer):
  chat_user = AccountSerializer(many=True)

  class Meta:
    model = Chat
    fields = '__all__'


class MessageSerializer(serializers.ModelSerializer):
  class Meta:
    model = Chat
    fields = '__all__'
