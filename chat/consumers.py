from asyncio import sleep
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
from user.models import Account, FriendRequest, Friendship
from .models import Message, Chat
from user.serializers import FriendRequestSerializer, FriendshipSerializer
import uuid


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


class UserConsumer(AsyncWebsocketConsumer):
  async def connect(self):
    self.group_name = 'requests_group'

    # Join room
    await self.channel_layer.group_add(
        self.group_name,
        self.channel_name
    )

    await self.accept()

  async def disconnect(self, code):
    # Disconnect from the room
    await self.channel_layer.group_discard(
        self.group_name,
        self.channel_name
    )

  async def receive(self, text_data):
    data = json.loads(text_data)

    if data['action'] == 'send-request':
      sender = data['sender']
      receiver = data['receiver']

      await self.channel_layer.group_send(
          self.group_name, {
              'type': 'send_request',
              'sender': sender,
              'receiver': receiver,
          }
      )

    if data['action'] == 'response':
      user_action = data['userAction']
      res_sender = data['sender']
      res_receiver = data['receiver']

      if user_action == 'accept':
        await self.channel_layer.group_send(
            self.group_name, {
                'type': 'requestRes',
                'sender': res_sender,
                'receiver': res_receiver,
            }
        )

  async def send_request(self, event):
    sender = event['sender']
    receiver = event['receiver']

    stored_request = await self.get_request(sender, receiver)

    # Send msg to WebSockets
    await self.send(text_data=json.dumps({
        'stored_request': stored_request,
        'action': 'send_request'
    }))

  async def requestRes(self, event):
    sender = event['sender']
    receiver = event['receiver']

    stored_friendship = await self.accept_request(sender, receiver)

    # Send msg to WebSockets
    await self.send(text_data=json.dumps({
        'stored_friendship': stored_friendship,
        'action': 'response',
        'username': sender
    }))

  @sync_to_async
  def get_request(self, sender, receiver):
    friend_request = FriendRequest.objects.filter(
        receiver__username=receiver, sender__username=sender)

    if friend_request.exists():
      serializer = FriendRequestSerializer(friend_request.first())

      return serializer.data

    sender_acc = Account.objects.get(username=sender)
    receiver_acc = Account.objects.get(username=receiver)

    # Create new request
    FriendRequest.objects.create(sender=sender_acc, receiver=receiver_acc)

    # Fetch and send back
    new_friend_request = FriendRequest.objects.get(
        receiver__username=receiver, sender__username=sender)
    serializer = FriendRequestSerializer(new_friend_request)

    return serializer.data

  @sync_to_async
  def accept_request(self, sender, receiver):
    friend_request = Friendship.objects.filter(
        user__username=sender).filter(user__username=receiver)

    if friend_request.exists():
      serializer = FriendshipSerializer(friend_request.first())

      return serializer.data

    sender_acc = Account.objects.get(username=sender)
    receiver_acc = Account.objects.get(username=receiver)

    # Create new request
    friendship = Friendship()
    friendship.save()

    friendship.user.add(sender_acc)
    friendship.user.add(receiver_acc)
    friendship.save()

    # Fetch and send back
    new_friendship = Friendship.objects.filter(
        user__username=sender).filter(user__username=receiver)
    serializer = FriendshipSerializer(new_friendship.first())

    # Remove friend request
    friend_request = FriendRequest.objects.filter(
        receiver__username=receiver, sender__username=sender)

    friend_request.delete()

    # Create chat
    chat_id = uuid.uuid4().int & (1 << 64)-1
    chat = Chat(chat_id=chat_id)
    chat.save()

    # Add users to new chat
    sender_account = Account.objects.get(username=sender)
    receiver_account = Account.objects.get(username=receiver)

    chat.chat_user.add(sender_account)
    chat.chat_user.add(receiver_account)

    chat.save()

    return serializer.data
