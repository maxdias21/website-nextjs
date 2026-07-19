from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated

from rest_framework.viewsets import ModelViewSet

from stories.serializers.stories import StoriesSerializer


# Create your views here.

class StoriesViewSet(ModelViewSet):
    permission_classes= (IsAuthenticated,)
    serializer_class = StoriesSerializer

    def get_queryset(self):
        user = self.request.user

