from django.db import models
from rest_framework import serializers
from .models import Account, FriendRequest, Friendship

class AccountSerializer(serializers.ModelSerializer):
  class Meta:
    model = Account
    fields = '__all__'

class FriendRequestSerializer(serializers.ModelSerializer):
  receiver = AccountSerializer()
  sender = AccountSerializer()

  class Meta:
    model = FriendRequest
    fields = '__all__'

class FriendshipSerializer(serializers.ModelSerializer):
  user = AccountSerializer(many=True)

  class Meta:
    model = Friendship
    fields = '__all__'