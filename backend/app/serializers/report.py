from rest_framework import serializers
from ..models.report import Report

class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = ['id', 'user', 'item', 'reason', 'comment', 'status', 'created_at']
        read_only_fields = ['user', 'created_at']