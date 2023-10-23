from django.shortcuts import render
from rest_framework import generics
from .api import serializers
from django.contrib.auth.models import User
from blog.models import Post,NewsLetterSubscribeUser
from rest_framework.generics import ListAPIView
from rest_framework.generics import CreateAPIView
from rest_framework.generics import DestroyAPIView
from rest_framework.generics import UpdateAPIView
from taggit.models import Tag
from django.shortcuts import get_object_or_404


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer

class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer


class PostList(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = serializers.PostSerializer

class PostDetail(generics.RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = serializers.PostSerializer


class UpdateTodoAPIView(UpdateAPIView):
    """This endpoint allows for updating a specific todo by passing in the id of the todo to update"""

    queryset = Post.objects.all()
    serializer_class = serializers.PostSerializer



class AddSubscriberAPIView(CreateAPIView):
    """This endpoint allows for updating a specific todo by passing in the id of the todo to update"""
    queryset = NewsLetterSubscribeUser.objects.all()
    serializer_class = serializers.NewsLetterSubscribeUserSerializer


class TaggedPostList(generics.ListCreateAPIView):
    
    model = Post
    serializer_class = serializers.PostSerializer
    tags="not defined"

    def get_queryset(self,some_thing=None):
    
        tags = self.kwargs['tags']
       
        try:
            tag = get_object_or_404(Tag, slug=tags)
            queryset = Post.objects.filter(tags__name=tags)
        except:
            queryset=[]

        print(queryset)
    
        return queryset
       