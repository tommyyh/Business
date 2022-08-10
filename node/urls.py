from django.urls import path
from . import views

urlpatterns = [
    path('new/', views.create_node),
    path('my-nodes/', views.my_nodes),
]
