from django.contrib.contenttypes.models import ContentType
from rest_framework import serializers

from likes.models import Likes
from posts.models import Posts


class LikesSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    content_type = serializers.CharField(write_only=True)

    likes_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Likes
        fields = ['content_type', 'object_id', 'value', 'user', 'likes_count']

    def validate(self, attrs):
        content_type = attrs['content_type']
        object_id = attrs['object_id']

        model = None

        if content_type == 'posts':
            model = Posts

        if not model:
            raise serializers.ValidationError({'value':'This field is required.'})

        if not model.objects.filter(pk=object_id).exists():
            raise serializers.ValidationError({
                "object_id": "Object with this id does not exist."
            })

        attrs['content_type'] = ContentType.objects.get_for_model(model)

        return attrs
