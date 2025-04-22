from django.db import models
from django.utils.translation import gettext_lazy as _
from .user import User
from .category import Category

class Item(models.Model):
    title = models.CharField(_('title'), max_length=200)
    description = models.TextField(_('description'))
    price = models.DecimalField(_('price'), max_digits=10, decimal_places=2)
    phone_number = models.CharField(_('phone number'), max_length=20)
    whatsapp_enabled = models.BooleanField(_('whatsapp enabled'), default=False)
    created_at = models.DateTimeField(_('created at'), auto_now_add=True)
    updated_at = models.DateTimeField(_('updated at'), auto_now=True)
    category = models.ForeignKey(
        Category, 
        on_delete=models.SET_NULL, 
        null=True,
        related_name='items',
        verbose_name=_('category')
    )
    user = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name='items',
        verbose_name=_('user')
    )
    is_active = models.BooleanField(_('active'), default=True)

    class Meta:
        verbose_name = _('item')
        verbose_name_plural = _('items')
        ordering = ['-created_at']

    def __str__(self):
        return self.title