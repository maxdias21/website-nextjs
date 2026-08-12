from django.db.models import Q, When, F, Case
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from rest_framework.viewsets import ModelViewSet

from friends.models import FriendsRequest
from stories.models import Stories
from stories.serializers.stories_serializer import StoriesSerializer


# Create your views here.

class StoriesViewSet(ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = StoriesSerializer
    http_method_names = ['get', 'post', 'delete']

    def get_queryset(self):
        user = self.request.user
        friends = (FriendsRequest.objects.filter(Q(from_user=user) | Q(to_user=user),
                                                 status=FriendsRequest.ACCEPTED).annotate(
            friend_id=Case(
                When(from_user=user, then='to_user'),
                default=F("from_user"))).
                   values_list('friend_id', flat=True))



        stories = Stories.objects.filter(Q(author_id__in=friends) | Q(author=user)).order_by('-created_at')
        return stories

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(author=self.request.user)

        return Response({'detail': "Story criado com sucesso."}, status=status.HTTP_201_CREATED)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()

        if instance.author != self.request.user:
            return Response('Post não encontrado', status=status.HTTP_404_NOT_FOUND)

        instance.delete()
        return Response("Post deletado com sucesso!", status=status.HTTP_200_OK)
