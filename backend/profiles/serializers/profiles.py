from django.contrib.auth.models import User

from rest_framework import serializers

from ..models import Profiles, FriendRequests


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name','last_name']


class ProfilesSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Profiles
        exclude = ('created_at', 'updated_at', 'id')

    def validate_bio(self, value):
        if len(value) < 3:
            raise serializers.ValidationError("Bio deve ter pelo menos 3 caracteres")
        if len(value) > 100:
            raise serializers.ValidationError("Bio deve no máximo 100 caracteres")

        return value


class FriendsRequestsSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)

    class Meta:
        model = FriendRequests
        fields = ['id', 'sender', 'receiver', 'status', 'created_at',]
        read_only_fields = ('sender',  'status', 'created_at',)
