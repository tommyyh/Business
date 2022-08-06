from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from django.urls import path
from . import consumers

application = ProtocolTypeRouter({
    'websocket': AllowedHostsOriginValidator(
        AuthMiddlewareStack(
            URLRouter(
                [
                    path('ws/chat/<int:room_id>/',
                         consumers.ChatConsumer.as_asgi()),
                    path('ws/friend-actions/', consumers.UserConsumer.as_asgi()),
                ]
            )
        )
    )
})
