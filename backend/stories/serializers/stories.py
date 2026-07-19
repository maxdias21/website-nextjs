from rest_framework import serializers

from stories.models import Story


class StoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Story

