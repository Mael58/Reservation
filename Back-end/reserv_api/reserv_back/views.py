from rest_framework import generics
from .models import Room, User
from .serializers import RoomSerializer, UserSerializer

from django.contrib.auth import authenticate, login, logout
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from django.shortcuts import get_object_or_404
from django.http import JsonResponse



class RoomList(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class Signup(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')

        # vérifier que les champs obligatoires sont remplis
        if not username or not password or not email:
            return Response({'error': 'All fields are required'})

        # créer un nouvel utilisateur
        user = User.objects.create_user(username, email, password)
        user.save()

        # renvoyer une réponse JSON de succès
        return Response({'message': 'User created successfully'})


class Login(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
   
    

    def create(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        print(request.user.is_authenticated)

        try:
            user = User.objects.get(email=email)
         
            
            print(user)
          
        except User.DoesNotExist:
            return Response({'error': 'User does not exist'})

        if not user.check_password(password):
            return Response({'error': 'Invalid password'})

        login(request, user)
        if request.user.is_authenticated:
            print(request.user.is_authenticated)
            token, _ = Token.objects.get_or_create(user=user)
            content = {'message': 'User logged in successfully', 'token': token.key}
           
            return Response(content)
        else:   
            return Response({'error': 'Login failed'})


class Logout(APIView):
    def get(self, request):
        logout(request)

        return Response({'message': 'User logged out successfully'}, status=status.HTTP_200_OK)


class AddRoomView(APIView):

    def post(self, request, format=None):
        serializer = RoomSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserDetails(APIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


    def get(self, request):
        token = request.META.get('HTTP_AUTHORIZATION')
      
        
        token_obj = Token.objects.get(key=token[6:])  # The token is prefixed by "Token "
        user = User.objects.get(auth_token=token_obj)
        serializer = UserSerializer(user)
        is_staff= serializer.data['is_staff']
        return JsonResponse({'is_staff': is_staff})
       
       
