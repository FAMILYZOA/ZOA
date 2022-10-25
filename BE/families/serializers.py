from rest_framework import serializers
from accounts.models import User
from families.models import Family


class FamilySerializer(serializers.ModelSerializer) :

    class Meta: 
        model = Family
        fields= '__all__'