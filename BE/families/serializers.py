from rest_framework import serializers
from accounts.models import User
from accounts.serializers import UserSerializer
from families.models import Family

class FamilySerializer(serializers.ModelSerializer) :

    class Meta: 
        model = Family
        fields= '__all__'

class FamilyRetriveSerializer(serializers.ModelSerializer) :
    users = UserSerializer(many=True,read_only=True)
    class Meta :
        model = Family 
        fields=('id','name','users',)
