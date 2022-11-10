from rest_framework import permissions

class IsFamilyorBadResponsePermission(permissions.BasePermission) :
    def has_permission(self,request,view) :
        return request.user.is_authenticated and request.user.family_id
    def has_object_permission(self, request, view, obj):
        if request.user.family_id :
            return True 
        return False

class IsObjectorBadResponsePermission(permissions.BasePermission) :
    def has_permission(self,request,view) :
        return request.user.is_authenticated and request.user.family_id
    def has_object_permission(self, request, view, obj):
        return request.user in obj.to_user_id.all()

class IsObjectAuthororBadResponsePermission(permissions.BasePermission) :
    def has_permission(self,request,view) :
        return request.user.is_authenticated and request.user.family_id
    def has_object_permission(self, request, view, obj):
        return request.user == obj.user


class InFamilyorBadResponsePermission(permissions.BasePermission) :
    def has_permission(self,request,view) :
        return request.user.is_authenticated and request.user.family_id
    def has_object_permission(self, request, view, obj):
        return request.user.family_id == obj 