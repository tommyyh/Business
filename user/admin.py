from django.contrib import admin
from .models import Account, FriendRequest, Friendship

# Register your models here.
admin.site.register(Account)
admin.site.register(FriendRequest)
admin.site.register(Friendship)
