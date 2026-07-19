from rest_framework import serializers

from friends.models import FriendsRequest


class FriendsSerializers(serializers.ModelSerializer):
    class Meta:
        model = FriendsRequest
        fields = '__all__'