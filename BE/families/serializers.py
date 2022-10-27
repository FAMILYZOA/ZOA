from rest_framework import serializers
from accounts.models import User
from accounts.serializers import UserSerializer
from families.models import Family, FamilyInteractionName

class FamilySerializer(serializers.ModelSerializer) :

    class Meta: 
        model = Family
        fields= '__all__'


class FamilyNameSetSerializer(serializers.ModelSerializer) :

    class Meta :
        model = FamilyInteractionName
        fields = '__all__'
        read_only_fields = ('family','to_user','from_user')

    def create(self, validated_data):
        print(validated_data)
        instance = self.Meta.model(**validated_data)
        instance.save()
        return instance


class FamilyRetriveSerializer(serializers.ModelSerializer) :
    users = UserSerializer(many=True,read_only=True)
    users_name = FamilyNameSetSerializer(many=True,read_only=True)
    class Meta :
        model = Family 
        fields=('id','name','users','users_name',)

class FamilyUpdateSerializer(serializers.ModelSerializer) :

    class Meta :
        model = Family 
        fields = ('id','name')