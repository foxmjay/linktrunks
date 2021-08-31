from rest_framework.permissions import BasePermission
from bookmarks.models import Bookmark


class IsOwner(BasePermission):

   """Custom permission class to allow only Bookmarks owners to edit them."""

   def has_object_permission(self,request,view,obj):

      """Return True if permission is granted to the Bookmark owner."""

      if isinstance(obj,Bookmark):
         return obj.owner == request.user
      return obj.owner == request.user
