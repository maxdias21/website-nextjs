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
    friends = models.ManyToManyField(User, related_name="friends_profiles")

    PUBLIC = "Public"
    PRIVATE = "Private"
    VISIBILITY_CHOICES = [(PUBLIC, "Public"), (PRIVATE, "Private")]
    visibility = models.CharField(choices=VISIBILITY_CHOICES, default=PUBLIC,
                                  max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.user.first_name} {self.user.last_name}'


class FriendRequests(models.Model):
    PENDING = "pending"
    ACCEPTED = "accepted"
    REJECTED = "rejected"

    STATUS_CHOICES = [
        (PENDING, "Pending"),
        (ACCEPTED, "Accepted"),
        (REJECTED, "Rejected"),
    ]

    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sender_requests")
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name="receiver_requests")
    status = models.CharField(choices=STATUS_CHOICES, default=PENDING, max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("sender", "receiver")

    def __str__(self):
        return f'{self.sender.first_name} {self.sender.last_name} to {self.receiver.first_name} {self.receiver.last_name}'
