from django.contrib import admin
from .models import User, Category, Item, Report, View

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'city', 'is_active')
    search_fields = ('username', 'email')

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'parent_category')
    list_filter = ('parent_category',)
    search_fields = ('name',)

@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'price', 'user', 'category', 'is_active')
    list_filter = ('category', 'is_active')
    search_fields = ('title', 'description')

@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    list_display = ('item', 'user', 'reason', 'status')
    list_filter = ('status', 'reason')
    search_fields = ('item__title', 'user__username')

@admin.register(View)
class ViewAdmin(admin.ModelAdmin):
    list_display = ('item', 'user', 'viewed_at')
    list_filter = ('item',)
    search_fields = ('item__title', 'user__username')