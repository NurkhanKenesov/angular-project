from backend.app.models.category import Category
from rest_framework import serializers
from ..models.item import Item
from .user import UserSerializer
from .category import CategorySerializer

class ItemSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source='category',
        write_only=True
    )

    class Meta:
        model = Item
        fields = [
            'id', 'title', 'description', 'price', 'phone_number', 
            'whatsapp_enabled', 'created_at', 'updated_at', 'category', 
            'category_id', 'user', 'is_active'
        ]
        read_only_fields = ['created_at', 'updated_at', 'user']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)