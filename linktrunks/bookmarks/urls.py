from django.conf.urls import url
from bookmarks import views
from rest_framework.urlpatterns import format_suffix_patterns


urlpatterns = [
    url(r'^bookmarks/$', views.BookmarkList.as_view()),
    url(r'^bookmarks/(?P<pk>[0-9]+)/$', views.BookmarkDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
