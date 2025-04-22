from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views.user import UserViewSet
from .views.category import CategoryViewSet
from .views.item import ItemViewSet
from .views.report import ReportViewSet
from .views.view import ViewViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'items', ItemViewSet)
router.register(r'reports', ReportViewSet)
router.register(r'views', ViewViewSet)

urlpatterns = [
    path('', include(router.urls)),
]