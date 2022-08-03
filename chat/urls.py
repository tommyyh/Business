from django.urls import path
from . import views

urlpatterns = [
    path('create-chat/', views.create_chat),
    path('get-chat-id/<str:username>/', views.get_chat_id),
    path('get-chat/<int:chat_id>/', views.get_chat),
]
