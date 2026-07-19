from rest_framework import serializers

from friends.serializers.user_serializer import UserSerializer
from ..models import Photos


class PhotosSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Photos
        fields = ('id','photo', 'user', 'created_at')
