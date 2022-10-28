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
    # to_family_name = FamilyNameSetSerializer(many=True,read_only=True)
    class Meta :
        model = User 
        fields = ('id','name','image',)

class FamilyUserSerializer(serializers.ModelSerializer) :
    users = UserSerializer(many=True,read_only=True)
    class Meta: 
        model = Family
        fields= ('id','name','created_at','users')

class FamilyNameSerializer(serializers.ModelSerializer) :
    class Meta :
        model = FamilyInteractionName
        fields = ('to_user','name')

class FamilyRetriveSerializer(serializers.ModelSerializer) :
    family_id = FamilyUserSerializer(read_only=True)
    from_family_name = FamilyNameSerializer(many=True,read_only=True)
    class Meta: 
        model = User 
        fields = ('family_id','from_family_name')



class FamilyUpdateSerializer(serializers.ModelSerializer) :

    class Meta :
        model = Family 
        fields = ('id','name')