from django.db import models
from user.models import Account


class Chat(models.Model):
  chat_user = models.ManyToManyField(Account, related_name='chat_user')
  chat_id = models.TextField(blank=True)

  def __str__(self):
    return self.chat_id


class Message(models.Model):
  message = models.TextField()
  user_message = models.ForeignKey(
      Account, on_delete=models.PROTECT, related_name='user_message')
  chat = models.ForeignKey(Chat, on_delete=models.PROTECT,
                           related_name='chat', blank=True)
  sentAt = models.DateTimeField(null=True)

  def __str__(self):
    return f'{self.message}'
