from rest_framework import serializers 
from myapi.models import Banks, Branches
 
 
class BankSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Banks
        fields = ('name',
                  'id')

class BranchSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Branches
        fields = ('ifsc', 'bank', 'branch', 'address', 'city', 'district', 'state')