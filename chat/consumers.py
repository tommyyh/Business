import json
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
from user.models import Account
from .models import Message, Chat


class ChatConsumer(AsyncWebsocketConsumer):
  async def connect(self):
    self.room_id = self.scope['url_route']['kwargs']['room_id']
    self.room_group_name = f'chat_{self.room_id}'

    # Join room
    await self.channel_layer.group_add(
        self.room_group_name,
        self.channel_name
    )

    await self.accept()

  async def disconnect(self, code):
    # Disconnect from the room
    await self.channel_layer.group_discard(
        self.room_group_name,
        self.channel_name
    )

  async def receive(self, text_data):
    data = json.loads(text_data)
    message = data['message']
    profile_pic = data['profilePic']
    name = data['name']
    surname = data['surname']
    username = data['username']
    sent_at = data['sentAt']
    room = data['roomId']

    # Save message
    await self.store_message(username, room, message, sent_at)

    await self.channel_layer.group_send(
        self.room_group_name, {
            'type': 'chat_message',
            'message': message,
            'profile_pic': profile_pic,
            'name': name,
            'surname': surname,
            'sentAt': sent_at,
        }
    )

  async def chat_message(self, event):
    message = event['message']
    profile_pic = event['profile_pic']
    name = event['name']
    surname = event['surname']
    sent_at = event['sentAt']

    # Send msg to WebSockets
    await self.send(text_data=json.dumps({
        'message': message,
        'sentAt': sent_at,
        'user_message': {
            'profile_pic': profile_pic,
            'name': name,
            'surname': surname,
        }
    }))

  @sync_to_async
  def store_message(self, username, room, message, sent_at):
    sender = Account.objects.get(username=username)
    chat = Chat.objects.get(chat_id=room)

    Message.objects.create(
        message=message, user_message=sender, chat=chat, sentAt=sent_at)
