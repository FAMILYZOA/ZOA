from rest_framework import serializers
from accounts.models import User
from families.models import Family, FamilyInteractionName

class FamilySerializer(serializers.ModelSerializer) :
    class Meta: 
        model = Family
        fields= '__all__'

class FamilyNameSetSerializer(serializers.ModelSerializer) :

    class Meta :
        model = FamilyInteractionName
        fields = ('from_user','name','to_user')
        read_only_fields = ('from_user','to_user')

    def create(self, validated_data):
        instance = self.Meta.model(**validated_data)
        instance.save()
        return instance

class UserSerializer(serializers.ModelSerializer) :
    set_name = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()
    class Meta :
        model = User 
        fields = ('id','name','image','set_name')

    def get_image(self,obj) :
        if 'kakao' in obj.image.url :
            res = obj.image.url.replace('https://zoa-bucket.s3.ap-northeast-2.amazonaws.com/http%3A/','http://')
            return res
        return obj.image.url
    def get_set_name(self,obj) :
        from_user = self.context.get('request').user
        to_user = obj
        if to_user == from_user :
            return '나'
        
        if FamilyInteractionName.objects.filter(from_user=from_user,to_user=to_user).exists() :
            return FamilyInteractionName.objects.get(from_user=from_user,to_user=to_user).name
        else :
            return False
    

class FamilyRetriveSerializer(serializers.ModelSerializer) :
    users = UserSerializer(many=True,read_only=True)
    class Meta: 
        model = Family 
        fields =('id','name','created_at','users')

class UserUnAuthorizedSerializer(serializers.ModelSerializer) :
    image = serializers.SerializerMethodField()
    class Meta :
        model = User 
        fields = ('image',)

    def get_image(self,obj) :
        if 'kakao' in obj.image.url :
            res = obj.image.url.replace('https://zoa-bucket.s3.ap-northeast-2.amazonaws.com/http%3A/','http://')
            return res
        return obj.image.url
class FamilyUnAuthorizedRetriveSerializer(serializers.ModelSerializer) :
    users = UserUnAuthorizedSerializer(many=True,read_only=True)
    class Meta: 
        model = Family 
        fields =('id','name','users')


class FamilyUpdateSerializer(serializers.ModelSerializer) :

    class Meta :
        model = Family 
        fields = ('id','name')