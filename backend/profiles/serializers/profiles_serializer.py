from rest_framework import serializers

from friends.serializers.user_serializer import UserSerializer
from ..models import Profiles


class ProfilesSerializer(serializers.ModelSerializer):
    birth_state = serializers.CharField()
    birth_state_display = serializers.CharField(read_only=True, source='get_birth_state_display')

    current_state = serializers.CharField()
    current_state_display = serializers.CharField(read_only=True, source='get_current_state_display')

    gender = serializers.CharField()
    gender_display = serializers.CharField(read_only=True, source='get_gender_display')

    user = UserSerializer(read_only=True)

    class Meta:
        model = Profiles
        exclude = ('created_at', 'updated_at', 'id', 'date_of_birth')

    def validate_bio(self, value):
        if len(value) < 3:
            raise serializers.ValidationError("Bio deve ter pelo menos 3 caracteres")
        if len(value) > 100:
            raise serializers.ValidationError("Bio deve no máximo 100 caracteres")

        return value

