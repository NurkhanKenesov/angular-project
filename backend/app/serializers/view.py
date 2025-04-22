from rest_framework import serializers
from ..models.view import View

class ViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = View
        fields = ['id', 'item', 'user', 'ip_address', 'viewed_at', 'location']
        read_only_fields = ['viewed_at']