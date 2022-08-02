from django.db import models

class Account(models.Model):
  name = models.CharField(max_length=300)
  surname = models.CharField(max_length=300)
  username = models.CharField(max_length=300)
  dob = models.DateField(max_length=300)
  email = models.CharField(max_length=255, unique=True)
  password = models.CharField(max_length=500)
  profile_pic = models.FileField(upload_to='media/profile/', blank=True)
  lives_in = models.CharField(max_length=300, blank=True)

  def __str__(self):
    return self.name + self.surname

class FriendRequest(models.Model):
  sender = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='sender', null=True)
  receiver = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='receiver', null=True)

  def __str__(self):
    return f'Sender: {self.sender}, Receiver: {self.receiver}'

class Friendship(models.Model):
  user = models.ManyToManyField(Account, related_name='user')