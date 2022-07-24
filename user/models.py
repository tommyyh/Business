from django.db import models

class Account(models.Model):
  name = models.CharField(max_length=300)
  surname = models.CharField(max_length=300)
  dob = models.DateField(max_length=300)
  email = models.CharField(max_length=300, unique=True)
  password = models.CharField(max_length=500)

  def __str__(self):
    return self.name + self.surname