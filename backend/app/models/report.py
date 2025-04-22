from django.db import models
from django.utils.translation import gettext_lazy as _
from .user import User
from .item import Item

class Report(models.Model):
    REASON_CHOICES = [
        ('fraud', _('Fraud')),
        ('rules_violation', _('Rules violation')),
        ('spam', _('Spam')),
        ('other', _('Other')),
    ]
    
    STATUS_CHOICES = [
        ('new', _('New')),
        ('in_progress', _('In progress')),
        ('resolved', _('Resolved')),
    ]

    user = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name='reports',
        verbose_name=_('user')
    )
    item = models.ForeignKey(
        Item, 
        on_delete=models.CASCADE, 
        related_name='reports',
        verbose_name=_('item')
    )
    reason = models.CharField(
        _('reason'), 
        max_length=50, 
        choices=REASON_CHOICES
    )
    comment = models.TextField(_('comment'), blank=True, null=True)
    status = models.CharField(
        _('status'), 
        max_length=20, 
        choices=STATUS_CHOICES, 
        default='new'
    )
    created_at = models.DateTimeField(_('created at'), auto_now_add=True)

    class Meta:
        verbose_name = _('report')
        verbose_name_plural = _('reports')

    def __str__(self):
        return f"Report #{self.id} on {self.item.title}"