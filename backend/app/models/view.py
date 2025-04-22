from django.db import models
from django.utils.translation import gettext_lazy as _
from .user import User
from .item import Item

class View(models.Model):
    item = models.ForeignKey(
        Item, 
        on_delete=models.CASCADE, 
        related_name='views',
        verbose_name=_('item')
    )
    user = models.ForeignKey(
        User, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name='views',
        verbose_name=_('user')
    )
    ip_address = models.CharField(_('IP address'), max_length=50, blank=True, null=True)
    viewed_at = models.DateTimeField(_('viewed at'), auto_now_add=True)
    location = models.CharField(_('location'), max_length=100, blank=True, null=True)

    class Meta:
        verbose_name = _('view')
        verbose_name_plural = _('views')

    def __str__(self):
        return f"View of {self.item.title}"