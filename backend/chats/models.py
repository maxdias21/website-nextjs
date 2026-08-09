from django.contrib.auth.models import User
from django.db import models

# Create your models here.

class Chats(models.Model):
    user1 = models.ForeignKey(User, on_delete=models.CASCADE, related_name='chat_as_user1')
    user2 = models.ForeignKey(User, on_delete=models.CASCADE, related_name='chat_as_user2')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user1', 'user2')

    def __str__(self):
        return f'{self.user1.username} to {self.user2.username}'



class Message(models.Model):
    chat = models.ForeignKey(Chats, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
