import time

from django.contrib.auth.models import User
from django.db import models
from django.utils.text import slugify


# Create your models here.

class Posts(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    content = models.TextField()
    creat_at = models.DateTimeField(auto_now_add=True)
    is_published = models.BooleanField(default=False)
    photo = models.ImageField(upload_to='posts/%Y/%m')
    slug = models.SlugField(unique=True, blank=True)

    # slug automático
    def save(self, *args, **kwargs):
        if not self.slug:
            timestamp = time.time()
            self.slug= slugify(f"{self.content[0:10]}-${timestamp}")

        super().save(*args, **kwargs)

    def __str__(self):
        return self.user.username

