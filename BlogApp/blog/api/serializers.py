from rest_framework import serializers
from django.contrib.auth.models import User
from blog.models import Post,NewsLetterSubscribeUser




class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


class PostSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = Post
        fields = '__all__'


class NewsLetterSubscribeUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsLetterSubscribeUser
        fields = '__all__'