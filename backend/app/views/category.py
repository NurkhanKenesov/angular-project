from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from ..models.category import Category
from ..serializers.category import CategorySerializer, CategoryTreeSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    @action(detail=False, methods=['get'])
    def tree(self, request):
        root_categories = Category.objects.filter(parent_category__isnull=True)
        serializer = CategoryTreeSerializer(root_categories, many=True)
        return Response(serializer.data)