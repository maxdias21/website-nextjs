from django.contrib.auth.models import User
from django.db.models import Q, Case, When, Value, IntegerField, F
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_201_CREATED, HTTP_409_CONFLICT, HTTP_200_OK
from rest_framework.views import APIView

from friends.models import FriendsRequest
from friends.serializers.user_serializer import UserSerializer
from profiles.models import Profiles


class FriendsRequestBase(APIView):
    """
    Classe base para todas as views de amizade.
    Centraliza permissões e métodos auxiliares reutilizáveis.
    """

    permission_classes = [IsAuthenticated]

    def get_user_by_id(self, user_id):
        """Busca um usuário pelo ID. Retorna None se não existir."""
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None

    def get_pending_request(self, from_user, to_user):
        """
        Busca uma solicitação de amizade pendente entre dois usuários.
        Retorna None se não existir.
        """
        return FriendsRequest.objects.filter(
            Q( from_user=from_user,
            to_user=to_user) |Q( to_user=from_user,
            from_user=to_user) ,

            status=FriendsRequest.PENDING
        ).first()

    def get_accepted_friendship(self, user, other_user):
        """
        Verifica se dois usuários já são amigos (solicitação aceita).
        Busca nos dois sentidos da relação. Retorna None se não forem amigos.
        """
        return FriendsRequest.objects.filter(
            Q(from_user=user, to_user_id=other_user) | Q(from_user=other_user, to_user_id=user),
            status=FriendsRequest.ACCEPTED
        ).first()


class SentFriendRequestsView(FriendsRequestBase):
    """
    Gerencia solicitações de amizade enviadas pelo usuário logado.

    GET  → lista solicitações enviadas que ainda estão pendentes
    POST → cancela uma solicitação enviada (não implementado)
    """

    def get(self, request):
        """Retorna todas as solicitações de amizade enviadas e ainda pendentes."""
        user = self.request.user

        sent_request = FriendsRequest.objects.filter(from_user=user, status=FriendsRequest.PENDING)

        people_ids = set()

        people_ids.update(people.to_user.id for people in sent_request)

        people_users = User.objects.filter(id__in=people_ids)

        serializer = UserSerializer(people_users, many=True, context={"request": request})

        return Response(serializer.data)



class ReceivedFriendRequestsView(FriendsRequestBase):
    """
    Lista os usuários que enviaram solicitação de amizade para o usuário logado.
    Retorna apenas solicitações com status pendente.
    """

    def get(self, request):
        """Retorna os perfis dos usuários que enviaram solicitações pendentes."""
        user = self.request.user

        pending_friends = FriendsRequest.objects.filter(
            to_user=user, status=FriendsRequest.PENDING
        )

        friends_ids = set()

        for friend in pending_friends:
            friends_ids.add(friend.from_user_id if user.id == friend.to_user_id else friend.to_user_id)

        user = User.objects.filter(id__in=friends_ids)
        user_serializer = UserSerializer(user, many=True, context={"request": request})

        return Response(user_serializer.data)


class ListFriendsView(FriendsRequestBase):
    """
    Retorna a lista de amigos do usuário autenticado.
    Busca solicitações aceitas nos dois sentidos da relação.
    """

    queryset = User.objects.all()

    def get(self, request):
        """Retorna os perfis de todos os amigos do usuário logado."""
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


class SuggestedPeopleView(FriendsRequestBase):
    """
    Sugere pessoas para adicionar como amigo.

    Exclui o próprio usuário e quem já tem solicitação pendente ou amizade.
    Ordena por relevância: mesmo estado atual → mesmo estado natal → perfil público.
    Usuários sem perfil recebem penalidade e aparecem por último.
    """

    queryset = User.objects.all()

    def get(self, request):
        """Retorna usuários sugeridos ordenados por proximidade de perfil."""
        user = request.user
        profile = user.profiles

        friends = (User.objects.exclude(
            Q(id=user.id) |
            Q(id__in=FriendsRequest.objects.filter(from_user=user).values('to_user')) |
            Q(id__in=FriendsRequest.objects.filter(to_user=user).values('from_user'))
        ).annotate(
            score_state=Case(
                When(profiles__current_state=profile.current_state, then=Value(3)),
                default=Value(0),
                output_field=IntegerField()
            ),
            score_birth=Case(
                When(profiles__birth_state=profile.birth_state, then=Value(2)),
                default=Value(0),
                output_field=IntegerField()
            ),
            score_visibility=Case(
                When(profiles__visibility=Profiles.PUBLIC, then=Value(1)),
                default=Value(0),
                output_field=IntegerField()
            ),
            score_no_profile=Case(
                When(profiles__isnull=True, then=Value(-1)),
                default=Value(0),
                output_field=IntegerField()
            ),

        ).annotate(
            relevance=F('score_state') + F('score_birth') + F('score_visibility') + F('score_no_profile')
        ).order_by('-relevance'))

        try:
            serializer = UserSerializer(friends, many=True, context={"request": request})
        except:
            return Response(
                {'error': "An error occured while fetching data."},
                status=HTTP_404_NOT_FOUND
            )

        return Response(
            serializer.data,
            status=HTTP_200_OK
        )


class SendFriendRequestView(FriendsRequestBase):
    """
    Envia uma solicitação de amizade para outro usuário.

    Validações antes de criar:
    - usuário destinatário existe
    - não existe solicitação pendente
    - os dois já não são amigos
    """

    def post(self, request):
        """Cria uma nova solicitação de amizade após validações."""
        to_user = self.get_user_by_id(request.data.get('to_user_id'))

        if to_user is None:
            return Response(
                {'error': "User does not exist."},
                status=HTTP_404_NOT_FOUND
            )

        pending_request = self.get_pending_request(request.user, to_user)

        if pending_request:
            return Response(
                {"error": "Request already sent."},
                status=HTTP_409_CONFLICT
            )

        already_friends = self.get_accepted_friendship(request.user, to_user)

        if already_friends:
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


class AcceptFriendRequestView(FriendsRequestBase):
    """
    Aceita uma solicitação de amizade recebida.
    Atualiza o status da solicitação de PENDING para ACCEPTED.
    """

    def post(self, request):
        """Aceita a solicitação enviada pelo usuário informado."""
        to_user = self.get_user_by_id(request.data.get('to_user_id'))

        if to_user is None:
            return Response(
                {'Error': "User does not exist."},
                status=HTTP_404_NOT_FOUND
            )

        pending_request = self.get_pending_request(to_user, request.user)

        if pending_request is None:
            return Response({"error": "Not friends request found."})

        pending_request.status = FriendsRequest.ACCEPTED
        pending_request.save()

        return Response(
            {"message": "Friends request accepted."},
            status=HTTP_201_CREATED
        )


class RejectOrRemoveFriendView(FriendsRequestBase):
    """
    Rejeita uma solicitação pendente ou remove uma amizade existente.
    Funciona nos dois casos — deleta o registro encontrado.
    """

    def post(self, request):
        """Deleta a solicitação pendente ou amizade com o usuário informado."""
        to_user = self.get_user_by_id(request.data.get('to_user_id'))

        if to_user is None:
            return Response(
                {'Error': "User does not exist."},
                status=HTTP_404_NOT_FOUND
            )

        pending_request = self.get_pending_request(to_user, request.user)
        existing_friendship = self.get_accepted_friendship(request.user, to_user)

        is_error = [pending_request, existing_friendship]
        print('ok')
        if pending_request is None and existing_friendship is None:
            return Response({"error": "Not friends request found."})

        for e in is_error:
            if e is not None:
                is_error = e
        is_error.delete()

        return Response(
            {"message": "Friends request rejected."},
            status=HTTP_201_CREATED
        )