from django.contrib.auth.models import User
from django.db.models import Q
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_201_CREATED, HTTP_409_CONFLICT, HTTP_200_OK
from rest_framework.views import APIView

from friends.models import FriendsRequest
from friends.serializers.user_serializer import UserSerializer, UserCreateSerializer


class FriendsRequestBase(APIView):
    """
    Classe base para operações relacionadas a solicitações de amizade.

    Define permissões de usuário autenticado e contém métodos auxiliares
    para buscar usuários, verificar solicitações pendentes e verificar
    amizades existentes.
    """

    permission_classes = [IsAuthenticated]

    def get_target_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None

    def friend_request(self, user_id, to_user_id):
        return FriendsRequest.objects.filter(
            from_user=user_id,
            to_user=to_user_id,
            status=FriendsRequest.PENDING
        ).first()

    def is_friends(self, user_id, to_user_id):
        return FriendsRequest.objects.filter(
            Q(from_user=user_id, to_user_id=to_user_id) | Q(from_user=to_user_id, to_user_id=user_id),
            status=FriendsRequest.ACCEPTED
        ).first()


class ListFriendsView(FriendsRequestBase):
    """
    Retorna a lista de amigos do usuário autenticado.

    Busca solicitações aceitas onde o usuário participa e retorna
    os usuários relacionados como amigos.
    """

    queryset = User.objects.all()

    def get(self, request):
        user = request.user
        friends = FriendsRequest.objects.filter(
            Q(from_user=user) | Q(to_user=user),
            status=FriendsRequest.ACCEPTED
        ).select_related('from_user', 'to_user').all()

        friends_user = []

        for f in friends:
            if f.from_user_id == user.id:
                friends_user.append(f.to_user)
            else:
                friends_user.append(f.from_user)

        serializer = UserSerializer(
            friends_user,
            many=True,
            context={"request": request}
        )

        return Response({"friends": serializer.data})


class ListPeople(FriendsRequestBase):
    """
    Retorna usuários que ainda não possuem amizade ou solicitação
    de amizade pendente com o usuário autenticado.
    """

    queryset = User.objects.all()

    def get(self, request):
        user = request.user

        friends = User.objects.exclude(
            Q(id=user.id) |
            Q(id__in=FriendsRequest.objects.filter(from_user=user).values('to_user')) |
            Q(id__in=FriendsRequest.objects.filter(to_user=user).values('from_user'))
        )
        try:
            serializer = UserSerializer(friends, many=True)
        except:
            return Response(
                {'error': "An error occured while fetching data."},
                status=HTTP_404_NOT_FOUND
            )

        return Response(
            {"friends": serializer.data},
            status=HTTP_200_OK
        )


class SendFriendRequestView(FriendsRequestBase):
    """
    Envia uma solicitação de amizade para outro usuário.

    Verifica se o usuário existe, se já existe uma solicitação pendente
    ou se os usuários já são amigos antes de criar uma nova solicitação.
    """

    def post(self, request):
        to_user = self.get_target_user(request.data.get('to_user_id'))

        if to_user is None:
            return Response(
                {'error': "User does not exist."},
                status=HTTP_404_NOT_FOUND
            )

        friend_request = self.friend_request(request.user, to_user)

        if friend_request:
            return Response(
                {"error": "Request already sent."},
                status=HTTP_409_CONFLICT
            )

        is_friends = self.is_friends(request.user, to_user)

        if is_friends:
            return Response(
                {"error": "Users are friends already."},
                status=HTTP_409_CONFLICT
            )

        FriendsRequest.objects.create(
            from_user=request.user,
            to_user=to_user,
            status=FriendsRequest.PENDING
        )

        return Response(
            {"message": "Friends request sent."},
            status=HTTP_201_CREATED
        )


class AcceptFriendView(FriendsRequestBase):
    """
    Aceita uma solicitação de amizade recebida.

    Atualiza o status da solicitação para aceita após validar
    a existência da solicitação.
    """

    def post(self, request):
        to_user = self.get_target_user(request.data.get('to_user_id'))

        if to_user is None:
            return Response(
                {'Error': "User does not exist."},
                status=HTTP_404_NOT_FOUND
            )

        friend_request = self.friend_request(request.user, to_user)

        if friend_request is None:
            return Response({"error": "Not friends request found."})

        friend_request.status = FriendsRequest.ACCEPTED
        friend_request.save()

        return Response(
            {"message": "Friends request accepted."},
            status=HTTP_201_CREATED
        )


class RejectFriendsView(FriendsRequestBase):
    """
    Rejeita uma solicitação de amizade ou remove uma amizade existente.

    Verifica se existe uma solicitação ou amizade entre os usuários
    e remove o registro correspondente.
    """

    def post(self, request):
        to_user = self.get_target_user(request.data.get('to_user_id'))
        print(to_user)
        if to_user is None:
            return Response(
                {'Error': "User does not exist."},
                status=HTTP_404_NOT_FOUND
            )

        friend_request = self.friend_request(request.user, to_user)
        is_friends = self.is_friends(request.user, to_user)
        print(is_friends, friend_request)
        is_error = [friend_request, is_friends]

        if friend_request is None and is_friends is None:
            return Response({"error": "Not friends request found."})

        for e in is_error:
            if e is not None:
                is_error = e
        is_error.delete()

        return Response(
            {"message": "Friends request rejected."},
            status=HTTP_201_CREATED
        )