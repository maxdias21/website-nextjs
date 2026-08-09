from django.contrib.auth.models import User
from django.contrib.messages.storage.cookie import MessageSerializer
from django.db.models import Q
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import  GenericViewSet
from rest_framework.mixins import CreateModelMixin, RetrieveModelMixin

from chats.models import Chats
from chats.serializers.chats_serializers import ChatsSerializer, MessageSerializer
from friends.models import FriendsRequest


# Create your views here.


class ChatsViewSet(CreateModelMixin, RetrieveModelMixin, GenericViewSet):
    queryset = Chats.objects.all()
    serializer_class = ChatsSerializer
    allowed_methods = ['get', 'post']
    permission_classes = [IsAuthenticated]

    def retrieve(self, request, *args, **kwargs):
        to_user_id = kwargs.get('pk')
        to_user = User.objects.filter(id=to_user_id).first()

        user = self.request.user

        if user == to_user:
            return Response("Não dá para mandar mensagem para você mesmo", status=status.HTTP_400_BAD_REQUEST)

        if not to_user:
            return Response("Usuário de destino não existe.", status=status.HTTP_404_NOT_FOUND)

        is_friends = FriendsRequest.objects.filter(
            (Q(from_user=user, to_user=to_user) | Q(from_user=to_user, to_user=user)),
            status=FriendsRequest.ACCEPTED).exists()

        if not is_friends:
            return Response("Você não é amigo da pessoa, não pode enviar mensagem.", status=status.HTTP_400_BAD_REQUEST)

        chat, _ = Chats.objects.get_or_create(
            user1=min(user, to_user, key=lambda u: u.id),
            user2=max(user, to_user, key=lambda u: u.id),
        )

        return Response(self.get_serializer(chat).data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        to_user_id = request.data.get('to_user')
        to_user = User.objects.filter(id=to_user_id).first()
        print(to_user_id)

        if not to_user:
            return Response("Usuário de destino não existe.", status=status.HTTP_404_NOT_FOUND)

        content = request.data.get('content')

        user = self.request.user

        is_friends = FriendsRequest.objects.filter(
            (Q(from_user=user, to_user=to_user) | Q(from_user=to_user, to_user=user)),
            status=FriendsRequest.ACCEPTED).exists()

        if not is_friends:
            return Response("Você não é amigo da pessoa, não pode enviar mensagem.", status=status.HTTP_400_BAD_REQUEST)

        chat, _ = Chats.objects.get_or_create(
            user1=min(user, to_user, key=lambda u: u.id),
            user2=max(user, to_user, key=lambda u: u.id),
        )

        message_serializer = MessageSerializer(data={
            "chat": chat.id,
            "content": content,
        })

        message_serializer.is_valid(raise_exception=True)
        message_serializer.save(sender=user)

        return Response(self.get_serializer(chat).data, status=status.HTTP_201_CREATED)
