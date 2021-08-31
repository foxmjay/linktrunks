from bookmarks.models import Bookmark
from bookmarks.serializers import BookmarkSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from bookmarks.permissions import IsOwner


# Create your views here.

class BookmarkList(APIView):

  #authentication_classes = (SessionAuthentication,BasicAuthentication)
  permission_classes = (IsAuthenticated,IsOwner)


  def get(self, request, format=None):
        bookmarks = Bookmark.objects.filter(owner=self.request.user)
        serializer = BookmarkSerializer(bookmarks, many=True)
        return Response(serializer.data)
  
  def post(self, request, format=None):
        serializer = BookmarkSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=self.request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BookmarkDetail(APIView):
  
    permission_classes = (IsAuthenticated,IsOwner)


    def get_object(self, pk):
        try:
            return Bookmark.objects.get(pk=pk,owner=self.request.user)
        except Bookmark.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        bookmark = self.get_object(pk)
        serializer = BookmarkSerializer(bookmark)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        bookmark = self.get_object(pk)
        serializer = BookmarkSerializer(bookmark, data=request.data)
        if serializer.is_valid():
            serializer.save(owner=self.request.user)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        bookmark = self.get_object(pk)
        bookmark.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
