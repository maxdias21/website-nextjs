from django.contrib.contenttypes.models import ContentType
from django.db.models import Exists, OuterRef, Count, Q
from django.contrib.auth.models import User
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from friends.models import FriendsRequest
from likes.models import Likes
from photos.models import Photos

from photos.serializer.photos_serializer import PhotosSerializer
from profiles.models import Profiles


class PhotosViewSet(viewsets.ModelViewSet):
    queryset = Photos.objects.all()
    serializer_class = PhotosSerializer
    permission_classes = [IsAuthenticated]
    http_method_names = ['get', 'post', 'delete']

    def retrieve(self, *args, **kwargs):
        pk = kwargs['pk']
        photo = Photos.objects.filter(pk=pk, user=self.request.user).first()

        if not photo:
            return Response({'message': 'Photo not found.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = PhotosSerializer(photo, context={'request': self.request})
        return Response(serializer.data)

    def get_queryset(self):
        content_type = ContentType.objects.get_for_model(Photos)
        user = self.request.user

        friends_id = FriendsRequest.objects.filter(
            Q(from_user=user) | Q(to_user=user), status=FriendsRequest.ACCEPTED).values_list('from_user', 'to_user')

        ids = set()
        for from_id, to_id in friends_id:
            ids.add(to_id if from_id == user else from_id)

        user_liked = Likes.objects.filter(
            content_type=content_type,
            user=user,
            value=1,
            object_id=OuterRef('id')
        )

        user_disliked = Likes.objects.filter(
            content_type=content_type,
            user=user,
            value=-1,
            object_id=OuterRef('id')
        )

        qs = (Photos.objects.filter(Q(user=user) |
                                    Q(user__profiles__visibility=Profiles.PUBLIC) |
                                    Q(user_id__in=ids)
                                    ).annotate(
            likes_count=Count('likes', filter=Q(likes__value=1)),
            dislikes_count=Count('likes', filter=Q(likes__value=-1)),
            is_liked=Exists(user_liked),
            is_disliked=Exists(user_disliked)
        ))

        author = self.request.query_params.get('author')
        mine = self.request.query_params.get('mine')

        if author:
            print('ok')
            author = User.objects.get(username=author)
            qs = qs.filter(user=author)
        elif mine:
            qs = qs.filter(user=user)

        return qs.order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def destroy(self, request, *args, **kwargs):
        photo = Photos.objects.filter(pk=kwargs.get('pk')).first()

        if not photo and (photo.user != self.request.user):
            return Response({'message': 'Photo not found.'}, status=status.HTTP_404_NOT_FOUND)

        photo.delete()

        return Response({'message': 'Photo deleted.'}, status=status.HTTP_204_NO_CONTENT)
