from datetime import  timedelta
from django.utils import timezone

from django.conf import settings
from django.db import models


# Create your models here.

class Stories(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="stories/")
    created_at = models.DateTimeField(auto_now_add=True, )
    expires_at = models.DateTimeField(null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.expires_at:
            self.expires_at = self.created_at or timezone.now() + timedelta(hours=24)

        super().save(*args, **kwargs)


    @property
    def is_expired(self):
        return timezone.now() > self.expires_at

