from datetime import date

from django.contrib.auth.models import User
from django.db import models

from posts.models import Posts


# Create your models here.

class Profiles(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField()
    profile_pic = models.ImageField(upload_to='profile_pics', blank=True, null=True)
    date_of_birth = models.DateField(default=date.today)

    PUBLIC = "Public"
    PRIVATE = "Private"
    VISIBILITY_CHOICES = [(PUBLIC, "Public"), (PRIVATE, "Private")]
    visibility = models.CharField(choices=VISIBILITY_CHOICES, default=PUBLIC,
                                  max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.user.first_name} {self.user.last_name}'
