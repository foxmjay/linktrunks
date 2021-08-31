from rest_framework import serializers
from bookmarks.models import Bookmark

class BookmarkSerializer(serializers.ModelSerializer):

  owner = serializers.ReadOnlyField(source='owner.username')

  class Meta:
    model = Bookmark
    fields = ('id','owner','title','url','tag','remindme','created')
