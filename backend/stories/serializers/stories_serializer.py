from rest_framework import serializers

from friends.serializers.user_serializer import UserSerializer
from stories.models import Stories


class StoriesSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)

    class Meta:
        model = Stories
        fields = ['id', 'author', 'image', 'created_at']
