from django.db import models
from user.models import Account

# Create your models here.


class Node(models.Model):
  name = models.CharField(max_length=255)
  node_pic = models.FileField(upload_to='media/nodes/', blank=True)
  members = models.ManyToManyField(Account)

  def __str__(self):
    return self.name
