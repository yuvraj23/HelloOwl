from django.db import models
from django.contrib.auth.models import User


STATUS = (
    (0,"Draft"),
    (1,"Publish")
)
from taggit.managers import TaggableManager 

class Post(models.Model):
    
    title = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(max_length=200, unique=True)
    owner = models.ForeignKey('auth.User', related_name='posts', on_delete=models.CASCADE)
    author=models.CharField(max_length=200,default="Yuvraj")
    updated_on = models.DateTimeField(auto_now= True)
    content = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)
    status = models.IntegerField(choices=STATUS, default=0)
    likes = models.IntegerField(default=0)
    dislikes = models.IntegerField(default=0)
    tags = TaggableManager(help_text="most-view ,  trending  , landing  ,  tech_news  ,  leetcode  ,  interview  ,   java  ,  angular  ,   design_pattern  ,   machine_learning  ,   rest_api   ,   python  ,  aws  ,  docker  ")
    tag_list=models.CharField(max_length=200,default="-")

    class Meta:
        ordering = ['-created_on']

    def __str__(self):
        return self.title

    
    def save(self, *args, **kwargs):
        self.author =self.owner.first_name+" "+self.owner.last_name
        if self.pk is not None: 
            tags_list=[]
            tag_obj=self.tags.all()
            for t in tag_obj:
                t=str(t)
                tg=t[0:len(t)]
                tags_list.append(tg)

            self.tag_list=str(tags_list)
        
        super(Post, self).save(*args, **kwargs)

class NewsLetterSubscribeUser(models.Model):
    email=models.CharField(max_length=200, unique=True)
    name=models.CharField(max_length=200)



