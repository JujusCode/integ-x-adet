from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product

# 1. Product Translator (Automatically handles the new image field!)
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

# 2. User Translator
class UserSerializer(serializers.ModelSerializer):
    # We add a custom field to easily tell React if this user is an Admin
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'isAdmin']

    def get_isAdmin(self, obj):
        return obj.is_staff