from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import AccountSerializer, FriendRequestSerializer, FriendshipSerializer
from .models import Account, FriendRequest, Friendship
import bcrypt
import jwt

@api_view(['POST'])
def register(request):
  raw_password = bytes(request.data['password'], encoding='utf-8')
  hashedPassword = bcrypt.hashpw(raw_password, bcrypt.gensalt())

  if not request.data['name'] or not request.data['surname'] or not request.data['dob'] or not request.data['email'] or not request.data['password']:
    return Response({ 'status': 400, 'msg': 'Please fill out the fields' })

  # Check if email is valid
  if '@' not in request.data['email']:
    return Response({ 'status': 400, 'msg': 'Invalid email' })

  # Check if email is taken
  if Account.objects.filter(email = request.data['email']):
    return Response({ 'status': 400, 'msg': 'Email is already taken' })

  # Check if username is taken
  if Account.objects.filter(username = request.data['username']):
    return Response({ 'status': 400, 'msg': 'Username is already taken' })

  # Check if password is at least 6 letters
  if not len(request.data['password']) > 5:
    return Response({
      'status': 400, 'msg': 'Password must be at least 6 characters long' 
    })

  # Check if passwords match
  if request.data['password'] != request.data['confirm']:
    return Response({
      'status': 400, 'msg': 'Passwords do not match' 
    })

  # Save user to the database
  serializer = AccountSerializer(data = {
    'name': request.data['name'],
    'surname': request.data['surname'],
    'username': request.data['username'],
    'dob': request.data['dob'],
    'email': request.data['email'],
    'password': hashedPassword.decode("utf-8"),
  })
  
  if serializer.is_valid():
    serializer.save()

    return Response({ 'status': 201 })
  else:
    print(serializer.errors)

    return Response({ 
      'status': 403, 'msg': 'There was an error creating your account' 
    })

@api_view(['POST'])
def login(request):
  email = request.data['email']
  password = request.data['password']
  user = Account.objects.filter(email = email).first()

  if not email or not password:
    return Response({ 'status': 400, 'msg': 'Please fill out the fields' })

  # Check if email is valid
  if '@' not in request.data['email']:
    return Response({ 'status': 400, 'msg': 'Invalid email' })

  if not user:
    return Response({ 'status': 400, 'msg': 'User not found' })

    # Check if password matches
  if bcrypt.checkpw(bytes(password, encoding='utf-8'), bytes(user.password, encoding='utf-8')):
    payload = {
      'id': user.id,
      'name': user.name,
      'surname': user.surname,
      'username': user.username,
      'email': user.email,
    }

    encoded_jwt = jwt.encode(payload, 'secret', algorithm='HS256')
    max_age = 365 * 24 * 60 * 60

    # Send token to cookies
    response = Response({
      'status': 200,
      'name': user.name,
      'surname': user.surname,
      'username': user.username,
      'dob': user.dob,
      'email': user.email,
    })
    response.set_cookie('token', encoded_jwt, max_age=max_age, httponly=True)

    # Save user to session
    request.session['user'] = payload
    request.session.modified = True

    return response
  else:
    return Response({ 'status': 400, 'msg': 'Incorrect password' })

@api_view(['GET'])
def authenticate(request):
  if 'token' in request.COOKIES:
    encoded_token = request.COOKIES['token']

    try:
      token = jwt.decode(encoded_token, 'secret', algorithms="HS256")
      account = Account.objects.get(id = token['id'])

      request.session['user'] = token

      return Response({
        'status': 200,
        'name': account.name,
        'surname': account.surname,
        'username': account.username,
        'dob': account.dob,
        'email': account.email,
      })

    except:
      return Response({
        'status': 401,
      })

  else:
    return Response({
      'status': 401,
    })

@api_view(['DELETE'])
def logout(request):
  # Delete user from session and cookies
  request.session['user'] = None

  response = Response({
    'status': 200,
  })
  response.delete_cookie('token')

  return response

@api_view(['POST'])
def send_request(request): # Error handling for not found users
  username = request.data['username']
  session_user = request.session['user']
  logged_user = Account.objects.get(id=session_user['id'])
 
  if not Account.objects.filter(username=username).count():
    return Response({ 'status': 400, 'msg': 'User does not exist' })

  if session_user['username'] != username:
    user = Account.objects.get(username=username)
    FriendRequest.objects.create(sender=logged_user, receiver=user)

    return Response({ 'status': 200 })
  else:
    return Response({ 'status': 400, 'msg': 'Cannot add yourself' })

@api_view(['GET'])
def get_requests(request): # Handle error where they have no friends :(
  try:
    session_user = request.session['user']
    friend_request = FriendRequest.objects.filter(receiver=session_user['id'])
    serializer = FriendRequestSerializer(friend_request, many=True)

    return Response({ 'status': 200, 'data': serializer.data })
  except:
    return Response({ 'status': 400, 'msg': 'Unable to show friend requests' })

@api_view(['POST'])
def request_response(request):
  action = request.data['action']
  username = request.data['username']
  receiver_username = request.data['receiver']

  try: # If clicked multiple
    # Update friend request status
    friend_request = FriendRequest.objects.get(sender__username=username, receiver__username=receiver_username)
    friend_request.delete()

    if action == 'accept':
      # Check if friendship already exists
      if Friendship.objects.filter(user__username=username).filter(user__username=receiver_username).exists():
        return Response({ 'status': 401 })

      friendship = Friendship()
      friendship.save()

      # Add users to friendship relation
      sender = Account.objects.get(username=username)
      receiver = Account.objects.get(username=receiver_username)

      friendship.user.add(sender)
      friendship.user.add(receiver)

      sender_account = Account.objects.get(username=username)
      serializer = AccountSerializer(sender_account)

      return Response({ 'status': 200, 'sender': serializer.data })
    else:
      return Response({ 'status': 201 })
  except:
    return Response({ 'status': 400 })

@api_view(['GET'])
def friends_list(request):
  session_user = request.session['user']
  user = Account.objects.get(id=session_user['id'])
  serializer = FriendshipSerializer(user.user.all(), many=True)
  
  return Response({ 'status': 200, 'data': serializer.data })