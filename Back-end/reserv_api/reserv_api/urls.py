"""
URL configuration for reserv_api project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from reserv_back.views import RoomList, Signup
from reserv_back import views



urlpatterns = [
    path('admin/', admin.site.urls),
   path('rooms/<int:pk>/', views.RoomUpdate.as_view(), name='room_list'),
    path('rooms/', views.RoomList.as_view(), name='room_list'),
    path('signup/', Signup.as_view(), name='signup'),
    path('login/', views.Login.as_view(), name='login'),
    path('add-room/', views.AddRoomView.as_view(), name='add_room'),
    path('user-details/', views.UserDetails.as_view(), name='user_details'),
    path('logout/', views.Logout.as_view(), name='logout'),
    
]
