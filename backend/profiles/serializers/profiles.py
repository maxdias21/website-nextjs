from rest_framework import serializers

from ..models import Profiles


class ProfilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profiles
        exclude = ('created_at', 'updated_at', 'user', 'id')

    def validate_bio(self, value):
        if len(value) < 3:
            raise serializers.ValidationError("Bio deve ter pelo menos 3 caracteres")
        if len(value) > 100:
            raise serializers.ValidationError("Bio deve no máximo 100 caracteres")

        return value
