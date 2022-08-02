from django.urls import path
from . import views

urlpatterns = [
  path('register/', views.register),
  path('login/', views.login),
  path('authenticate/', views.authenticate),
  path('logout/', views.logout),
  path('send-request/', views.send_request),
  path('my-requests/', views.get_requests),
  path('request-response/', views.request_response),
  path('friends-list/', views.friends_list),
  path('remove-friend/', views.remove_friend),
  path('user-info/<str:username>/', views.user_info),
  path('update/<str:username>/', views.update_profile),
]