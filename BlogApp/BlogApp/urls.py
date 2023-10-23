"""BlogApp URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
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
from rest_framework.urlpatterns import format_suffix_patterns
from blog import views
from django.urls import include, path

urlpatterns = [
     path('admin/', admin.site.urls),
    path('posts/', views.PostList.as_view()),
    path('posts/<int:pk>/', views.PostDetail.as_view()),
    path("post/like/update/<int:pk>/",views.UpdateTodoAPIView.as_view(),name="update_todo"),
    path("add/subscriber/",views.AddSubscriberAPIView.as_view(),name="add_subscriber"),
    path("tagged/post/<str:tags>/",views.TaggedPostList.as_view(),name="tagged_post")
]
urlpatterns = format_suffix_patterns(urlpatterns)