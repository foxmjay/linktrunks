from django.test import TestCase
from bookmarks.models import Bookmark
from bookmarks.serializers import BookmarkSerializer
from django.utils import timezone
from django.core.urlresolvers import reverse
from django.contrib.auth.models import User

class BookmarkSerializerTest(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='12345')

        self.bookmark_attributes = {
            'owner' : self.user,
            'title' : 'url title',
            'url'   : 'url.com',
            'tag'   : 'tag1,tag2',
            'remindme' : True
        }

        self.serializer_data = {
            'owner' : self.user,
            'title' : 'url title',
            'url'   : 'url.com',
            'tag'   : 'tag1,tag2',
            'remindme' : True
        }
    
        self.bookmark = Bookmark.objects.create(**self.bookmark_attributes)
        self.serializer = BookmarkSerializer(instance=self.bookmark)

    def test_contains_expected_fields(self):
        data = self.serializer.data

        self.assertEqual(set(data.keys()),set(['id','owner','title','url','tag','remindme','created']))

    def test_title_field_content(self):
        data = self.serializer.data

        self.assertEqual(data['title'],self.bookmark_attributes['title'])

    def test_url_field_content(self):
        data = self.serializer.data

        self.assertEqual(data['url'],self.bookmark_attributes['url'])

    def test_tag_field_content(self):
        data = self.serializer.data

        self.assertEqual(data['tag'],self.bookmark_attributes['tag'])

    def test_remindme_field_content(self):
        data = self.serializer.data

        self.assertEqual(data['remindme'],self.bookmark_attributes['remindme'])

    #this test perpose is to return a negative unit test , the tested content doesn't make sense
    def test_field_content_suppose_to_fail(self):
        data = self.serializer.data

        self.assertEqual(data['remindme'],self.bookmark_attributes['title'])