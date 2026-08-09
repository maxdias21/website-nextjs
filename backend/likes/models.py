from django.contrib.auth.models import User
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models


# Create your models here.

class Likes(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE,
                                     limit_choices_to={'model__in': ['photos', 'posts']})
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')
    value = models.SmallIntegerField(choices=([1, 'likes'], (-1, 'dislike')))

    class Meta:
        unique_together = ('user', 'content_type', 'object_id')
        verbose_name_plural = 'Likes'
        verbose_name = 'Like'

    def __str__(self):
        return f'{self.user}'

