from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError


# Create your models here.

class FriendsRequest(models.Model):
    PENDING = "pending"
    ACCEPTED = "accepted"
    REJECTED = "rejected"

    STATUS_CHOICES = [(PENDING, "Pending"), (
        ACCEPTED, "Accepted"), (REJECTED, "Rejected")]

    from_user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="from_user")
    to_user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="to_user")
    status = models.CharField(choices=STATUS_CHOICES, default="pending", max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)


    def clean(self):
        if self.from_user == self.to_user:
            raise ValidationError("You cannot add friends to yourself.")

    class Meta:
        verbose_name_plural = "Friends Requests"
        verbose_name = "Friend Request"

        constraints = [
            models.UniqueConstraint(
                fields=["from_user", "to_user"],
                name="unique_from_to_user",
            ),
        ]

        indexes = [
            models.Index(fields=["from_user", "to_user"]),
            models.Index(fields=["from_user", "status"]),
            models.Index(fields=["to_user", "status"]),

        ]
