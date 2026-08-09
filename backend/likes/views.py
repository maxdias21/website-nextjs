from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from likes.models import Likes
from likes.serializers.likes_serializer import LikesSerializer


# Create your views here.

class LikesViewSet(APIView):
    def post(self, request):
        serializer = LikesSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)

        like = Likes.objects.filter(
            user=request.user,
            content_type=serializer.validated_data['content_type'],
            object_id=serializer.validated_data['object_id']
        ).first()

        like_value = serializer.validated_data['value']

        if like:
            if like.value == like_value:
                like.delete()
                return Response({'information': "Removed successfully"})

            like.value = serializer.validated_data['value']
            like.save()
        else:
            serializer.save(user=self.request.user)

        return Response({'likes': serializer.data})
