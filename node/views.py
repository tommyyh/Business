from rest_framework.response import Response
from rest_framework.decorators import api_view

from user.models import Account
from .models import Node
from .serializers import NodeSerializer


@api_view(['GET'])
def my_nodes(request):
  username = request.session['user']['username']
  nodes = Node.objects.filter(members__username=username)
  serializer = NodeSerializer(nodes, many=True)

  return Response({'status': 200, 'data': serializer.data})


@api_view(['POST'])
def create_node(request):
  name = request.data['name']
  node_pic = request.data['node_pic']
  username = request.session['user']['username']
  user = Account.objects.get(username=username)

  # Create new node
  new_node = Node(name=name, node_pic=node_pic)
  new_node.save()

  new_node.members.add(user)

  serializer = NodeSerializer(new_node)

  return Response({'status': 200, 'data': serializer.data})
