from django.test import TestCase
from bookmarks.models import Bookmark
from django.utils import timezone
from django.core.urlresolvers import reverse
from django.contrib.auth.models import User

# models test
class BookmarkTest(TestCase):

    def create_bookmark(self, title="URL TITLE", url="url.com",tag='arduino,django',remindme=True):
        user = User.objects.create_user(username='testuser', password='12345')        
        return Bookmark.objects.create(owner=user,title=title, url=url,tag=tag,remindme=remindme)

    def test_bookmark_creation(self):
        w = self.create_bookmark()
        self.assertTrue(isinstance(w, Bookmark))
        self.assertEqual(w.__unicode__(), w.title)

class BookmarkModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        user = User.objects.create_user(username='testuser', password='12345')
        Bookmark.objects.create(owner=user,title="url title", url="url.com",tag="tag1,tag2",remindme=True)

    def test_title_label(self):
        bookmark = Bookmark.objects.get(id=1)
        title_label = bookmark._meta.get_field('title').verbose_name
        self.assertEquals(title_label, 'title')


    def test_url_label(self):
        bookmark = Bookmark.objects.get(id=1)
        url_label = bookmark._meta.get_field('url').verbose_name
        self.assertEquals(url_label, 'url')

    def test_tag_label(self):
        bookmark = Bookmark.objects.get(id=1)
        tag_label = bookmark._meta.get_field('tag').verbose_name
        self.assertEquals(tag_label, 'tag')

    def test_remindme_label(self):
        bookmark = Bookmark.objects.get(id=1)
        remindme_label = bookmark._meta.get_field('remindme').verbose_name
        self.assertEquals(remindme_label, 'remindme')

    def test_created_label(self):
        bookmark = Bookmark.objects.get(id=1)
        created_label = bookmark._meta.get_field('created').verbose_name
        self.assertEquals(created_label, 'created')

    def test_title_content(self):
        bookmark = Bookmark.objects.get(id=1)
        expected_object_name = bookmark.title
        self.assertEquals(expected_object_name, 'url title')

    def test_url_content(self):
        bookmark = Bookmark.objects.get(id=1)
        expected_object_name = bookmark.url
        self.assertEquals(expected_object_name, 'url.com')

    def test_tag_content(self):
        bookmark = Bookmark.objects.get(id=1)
        expected_object_name = bookmark.tag
        self.assertEquals(expected_object_name, 'tag1,tag2')

    def test_remindme_content(self):
        bookmark = Bookmark.objects.get(id=1)
        expected_object_name = bookmark.remindme
        self.assertEquals(expected_object_name, True)