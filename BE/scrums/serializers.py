from rest_framework import serializers

from families.models import FamilyInteractionName
from .models import Comment, Scrum

class ImageSerializer(serializers.ModelSerializer) :

    image = serializers.SerializerMethodField()

    def get_image(self,obj) :
        user = obj.user
        if 'kakao' in user.image.url :
            res = user.image.url.replace('https://zoa-bucket.s3.ap-northeast-2.amazonaws.com/http%3A/','https://')
            return res
        return user.image.url

class CommentSerializer(ImageSerializer) :
    user_id = serializers.IntegerField(source='user.id',read_only=True)
    name = serializers.CharField(source='user.name',read_only=True)
    writer_id = serializers.IntegerField(source='scrum.user.id',read_only=True)
    set_name = serializers.SerializerMethodField()

    class Meta :
        model = Comment
        fields = ('id','user_id','name','image','content','created_at','set_name','writer_id',)

    def get_set_name(self,obj) :
        from_user = self.context.get('request').user
        to_user = obj.user
        if to_user == from_user :
            return '나'
        
        if FamilyInteractionName.objects.filter(from_user=from_user,to_user=to_user).exists() :
            return FamilyInteractionName.objects.get(from_user=from_user,to_user=to_user).name
        else :
            return False
            
class ScrumSerializer(ImageSerializer) :

    user_id = serializers.IntegerField(source='user.id',read_only=True)
    name = serializers.CharField(source='user.name',read_only=True)
    set_name = serializers.SerializerMethodField()
    family_created = serializers.DateField(source='family.created_at',read_only=True)
    class Meta: 
        model = Scrum
        fields= ('id','user_id','emoji','yesterday','today','name','image','set_name','family_created')

    def get_set_name(self,obj) :
        from_user = self.context.get('request').user
        to_user = obj.user
        if to_user == from_user :
            return '나'
        #쿼리 호출 
        if FamilyInteractionName.objects.filter(from_user=from_user,to_user=to_user).exists() :
            return FamilyInteractionName.objects.get(from_user=from_user,to_user=to_user).name
        else :
            return False

class ScrumDetailSerializer(ScrumSerializer) :
    emoji = serializers.CharField(max_length=50,required=False)
    comment = CommentSerializer(many=True,read_only=True)
    class Meta: 
        model = Scrum
        fields= ('id','user_id','emoji','yesterday','today','name','image','set_name','comment')
            
class MainScrumSerializer(ScrumSerializer) :
    class Meta :
        model = Scrum
        fields= ('id','user_id','emoji','today','name','image','set_name')
