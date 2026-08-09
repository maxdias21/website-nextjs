from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.fields import SerializerMethodField

from chats.models import Message, Chats


class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.PrimaryKeyRelatedField(read_only=True)


    class Meta:
        model = Message
        fields = ['chat', 'content', 'sender', 'created_at']


class ChatsSerializer(serializers.ModelSerializer):
    messages = SerializerMethodField()
    to_user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), write_only=True)
    content = serializers.CharField(write_only=True)
    current_id = serializers.SerializerMethodField()


    class Meta:
        model = Chats
        fields = ['id', 'to_user', 'content', 'user2', 'messages', 'current_id']
        read_only_fields = ['user1', 'user2']

    def get_messages(self, obj):
        messages = obj.messages.all().order_by('created_at')
        return MessageSerializer(messages, many=True).data

    def get_current_id(self, obj):
        return  self.context['request'].user.id
