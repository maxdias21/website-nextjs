from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from photos.models import Photos
from photos.serializer.photos_serializer import PhotosSerializer


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
        return Photos.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def destroy(self, request, *args, **kwargs):
        photo = Photos.objects.filter(pk=kwargs.get('pk')).first()

        if not photo and (photo.user != self.request.user):
            return Response({'message': 'Photo not found.'}, status=status.HTTP_404_NOT_FOUND)

        photo.delete()

        return Response({'message': 'Photo deleted.'}, status=status.HTTP_204_NO_CONTENT)
