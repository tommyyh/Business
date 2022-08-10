from asyncio import sleep
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
from user.models import Account, FriendRequest, Friendship
from chat.models import Chat
from user.serializers import FriendRequestSerializer, FriendshipSerializer
import uuid


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
                'type': 'response_accept',
                'sender': res_sender,
                'receiver': res_receiver,
            }
        )
      else:
        await self.channel_layer.group_send(
            self.group_name, {
                'type': 'response_reject',
                'sender': res_sender,
                'receiver': res_receiver,
            }
        )

  async def send_request(self, event):
    sender = event['sender']
    receiver = event['receiver']
    if_exists = await self.friend_request_exists(sender, receiver)
    receiver_exists = await self.receiver_exists(receiver)

    if sender == receiver:
      return await self.send(text_data=json.dumps({
          'action': 'send_request_add_yourself'
      }))

    if not receiver_exists:
      return await self.send(text_data=json.dumps({
          'action': 'send_request_user_exists'
      }))

    if if_exists:
      return await self.send(text_data=json.dumps({
          'action': 'send_request_exists'
      }))

    stored_request = await self.get_request(sender, receiver)

    # Send msg to WebSockets
    await self.send(text_data=json.dumps({
        'stored_request': stored_request,
        'action': 'send_request'
    }))

  async def response_accept(self, event):
    sender = event['sender']
    receiver = event['receiver']

    stored_friendship = await self.accept_request(sender, receiver)

    # Send msg to WebSockets
    await self.send(text_data=json.dumps({
        'stored_friendship': stored_friendship,
        'action': 'response',
        'username': sender
    }))

  async def response_reject(self, event):
    sender = event['sender']
    receiver = event['receiver']

    await self.reject_request(sender, receiver)

    # Send msg to WebSockets
    await self.send(text_data=json.dumps({
        'action': 'reject',
        'sender': sender,
        'receiver': receiver,
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

  @sync_to_async
  def friend_request_exists(self, sender, receiver):
    friend_requests = FriendRequest.objects.filter(
        receiver__username=receiver, sender__username=sender).exists()

    return friend_requests

  @sync_to_async
  def receiver_exists(self, receiver):
    try:
      Account.objects.get(username=receiver)

      return True
    except:
      return False

  @sync_to_async
  def reject_request(self, sender, receiver):
    friend_request = FriendRequest.objects.filter(
        sender__username=sender, receiver__username=receiver)
    friend_request.delete()