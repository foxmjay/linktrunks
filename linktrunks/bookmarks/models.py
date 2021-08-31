from django.db import models
from django.contrib.postgres.fields import ArrayField

from django.db.models.signals import post_save
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.dispatch import receiver

# Create your models here.


class Bookmark(models.Model):


  owner = models.ForeignKey('auth.User',related_name='bookmarks') 
  title = models.CharField(max_length=250,blank=True,default='')
  url = models.CharField(max_length=250,blank=True,default='')
  tag = models.CharField(max_length=250,blank=True,default='')
  #tag = ArrayField(models.CharField(max_length=20,blank=True))
  remindme = models.BooleanField(default=False)
  created = models.DateTimeField(auto_now_add=True)
 
  class Meta:

    ordering = ('created',) 
