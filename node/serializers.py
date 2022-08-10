from rest_framework import serializers
from user.serializers import AccountSerializer
from .models import Node


class NodeSerializer(serializers.ModelSerializer):
  members = AccountSerializer(many=True)

  class Meta:
    model = Node
    fields = '__all__'
