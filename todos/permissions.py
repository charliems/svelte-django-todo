from rest_framework import permissions


# Users can only access their own todos
class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user
