from rest_framework import viewsets, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Category, Item
from .serializers import CategorySerializer, ItemSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    @action(detail=True)
    def items(self, request, pk=None):
        category = self.get_object()
        items = Item.objects.filter(category=category, is_active=True)
        serializer = ItemSerializer(items, many=True)
        return Response(serializer.data)

class ItemViewSet(viewsets.ModelViewSet):
    serializer_class = ItemSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'is_active', 'whatsapp_enabled']
    search_fields = ['title', 'description']
    ordering_fields = ['created_at', 'price']
    ordering = ['-created_at']

    def get_queryset(self):
        queryset = Item.objects.all()
        if self.action == 'list':
            # Для списка показываем только активные объявления
            queryset = queryset.filter(is_active=True)
        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        # Проверяем, является ли пользователь владельцем объявления
        if self.request.user == serializer.instance.user:
            serializer.save()
        else:
            raise permissions.PermissionDenied(
                "You don't have permission to edit this item."
            ) 