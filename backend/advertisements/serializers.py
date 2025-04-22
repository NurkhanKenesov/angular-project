from rest_framework import serializers
from .models import Category, Item
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'parent_category']

class ItemSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Item
        fields = [
            'id', 'title', 'description', 'price',
            'phone_number', 'whatsapp_enabled', 'created_at',
            'updated_at', 'category', 'category_name', 'user',
            'is_active'
        ]
        read_only_fields = ['created_at', 'updated_at', 'user']

    def create(self, validated_data):
        # Автоматически устанавливаем текущего пользователя
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data) 