from django.contrib import admin
from .models import Post,NewsLetterSubscribeUser
from django.contrib.auth.models import User
from django.db import models
from django import forms
from django.forms import TextInput, Textarea


class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'status','created_on')
    list_filter = ("status",)
    search_fields = ['title', 'content']
    prepopulated_fields = {'slug': ('title',)}
    formfield_overrides = {
        models.CharField: {'widget': TextInput(attrs={'size':'90'})},
        models.TextField: {'widget': Textarea(attrs={'rows':40, 'cols':500})},
    }

admin.site.register(Post, PostAdmin)


class NewsLetterSubscribeUserAdmin(admin.ModelAdmin):
    list_display = ('name','email' )

admin.site.register(NewsLetterSubscribeUser, NewsLetterSubscribeUserAdmin)






