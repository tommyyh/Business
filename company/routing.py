from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from django.urls import path
from chat import consumers as chat_consumers
from user import consumers as user_consumers

application = ProtocolTypeRouter({
    'websocket': AllowedHostsOriginValidator(
        AuthMiddlewareStack(
            URLRouter(
                [
                    path('ws/chat/<int:room_id>/',
                         chat_consumers.ChatConsumer.as_asgi()),
                    path('ws/friend-actions/',
                         user_consumers.UserConsumer.as_asgi()),
                ]
            )
        )
    )
})
