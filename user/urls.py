from django.urls import path
from . import views

urlpatterns = [
  path('register/', views.register),
  path('login/', views.login),
  path('authenticate/', views.authenticate),
  path('logout/', views.logout),
]