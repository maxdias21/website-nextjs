from django.conf import settings
from django.contrib.auth.models import User
from django.db.models import Q, When, Case, IntegerField
from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import permission_classes, api_view
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from profiles.models import Profiles, FriendRequests
from profiles.serializers.profiles import ProfilesSerializer, FriendsRequestsSerializer


# ──────────────────────────────────────────────
# USUÁRIOS
# ──────────────────────────────────────────────

# Retorna lista de todos os usuários (id, username, data de cadastro)
# Só acessível para usuários autenticados
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_users(request):
    users = User.objects.values("id", "username", "date_joined")
    return Response(list(users))


# ──────────────────────────────────────────────
# PERFIS
# ──────────────────────────────────────────────

class ProfileApiView(ModelViewSet):
    queryset = Profiles.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = ProfilesSerializer

    # Sobrescreve o save para vincular o perfil ao usuário logado
    # Não usamos Model.save() porque lá não temos acesso ao request.user
    def perform_create(self, serializer):
        # get_or_create retorna (objeto, criado?)
        profile, created = Profiles.objects.get_or_create(user=self.request.user)

        # Se "created" for False, o perfil já existia — lança erro
        if not created:
            raise ValidationError("Usuário já tem um perfil")

        serializer.save(user=self.request.user)

    def get_queryset(self):
        return Profiles.objects.exclude(user=self.request.user)

    def list(self, request, *args, **kwargs):
        profiles = self.get_queryset().select_related("user")
        serializer = self.get_serializer(profiles, many=True)

        friendships = FriendRequests.objects.filter(
            Q(sender=request.user) | Q(receiver=request.user)
        ).select_related("sender", "receiver")

        relationships = {}
        friend_ids = set()

        for friendship in friendships:
            other_user = (
                friendship.receiver
                if friendship.sender == request.user
                else friendship.sender
            )
            if friendship.status == FriendRequests.ACCEPTED:
                relationships[other_user.id] = "friend"
                friend_ids.add(other_user.id)
            elif friendship.status == FriendRequests.PENDING:
                if friendship.sender == request.user:
                    relationships[other_user.id] = "request_sent"
                else:
                    relationships[other_user.id] = "request_received"

        data = serializer.data

        # Filtra amigos da resposta final
        result = []
        for item, profile in zip(data, profiles):
            if profile.user.id not in friend_ids:
                item["relationship"] = relationships.get(profile.user.id, "none")
                result.append(item)

        return Response(result)

    # Sobrescreve o GET de detalhe (GET /profiles/<id>/)
    # Bloqueia acesso a perfis privados de outros usuários
    def retrieve(self, request, *args, **kwargs):
        profile = self.get_object()

        if profile.visibility == Profiles.PRIVATE and profile.user != request.user:
            return Response(
                {"detail": "O perfil selecionado é privado."},
                status=status.HTTP_403_FORBIDDEN
            )

        # Perfil público ou é o dono — segue o fluxo normal do DRF
        return super().retrieve(request, *args, **kwargs)


# ──────────────────────────────────────────────
# AUTENTICAÇÃO JWT via COOKIES
# ──────────────────────────────────────────────

class CustomObtainPairView(TokenObtainPairView):
    """
    Sobrescreve o login padrão do SimpleJWT.
    Em vez de retornar os tokens no body (visível ao JS),
    salva access e refresh como cookies HttpOnly — mais seguro contra XSS.
    """

    def post(self, request, *args, **kwargs):
        # Chama o login original do SimpleJWT (valida usuário e senha)
        response = super().post(request, *args, **kwargs)

        if response.status_code == 200:
            access_token = response.data.get('access')
            refresh_token = response.data.get('refresh')

            # Cookie do access token (curta duração, ex: 5 min)
            response.set_cookie(
                key='access_token',
                value=access_token,
                max_age=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'].total_seconds(),
                httponly=True,  # JS não consegue ler esse cookie
                samesite=settings.SESSION_COOKIE_SAMESITE,
                secure=settings.SESSION_COOKIE_SECURE,  # só envia via HTTPS em produção
                path='/'
            )

            # Cookie do refresh token (longa duração, ex: 7 dias)
            response.set_cookie(
                key='refresh_token',
                value=refresh_token,
                max_age=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'].total_seconds(),
                httponly=True,
                samesite=settings.SESSION_COOKIE_SAMESITE,
                secure=settings.SESSION_COOKIE_SECURE,
                path='/'
            )

        return response


class CustomTokenRefreshView(TokenRefreshView):
    """
    Sobrescreve o refresh padrão do SimpleJWT.
    Lê o refresh token do cookie (não do body),
    gera um novo access token e salva ele no cookie.
    Isso conecta com o silent refresh do apiFetch no frontend.
    """

    def post(self, request, *args, **kwargs):
        # Tenta pegar o refresh token do cookie
        refresh_token = request.COOKIES.get('refresh_token')

        if not refresh_token:
            return Response({"error": "Sem refresh token"}, status=401)

        # Injeta o refresh token no body para o SimpleJWT processar normalmente
        request.data['refresh'] = refresh_token

        try:
            response = super().post(request, *args, **kwargs)
        except:
            # Token inválido ou expirado — força novo login
            return Response({"error": "Refresh token inválido"}, status=401)

        # Salva o novo access token no cookie
        response.set_cookie(
            key="access_token",
            value=response.data["access"],
            max_age=settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"].total_seconds(),
            httponly=True,
            samesite=settings.SESSION_COOKIE_SAMESITE,
            secure=settings.SESSION_COOKIE_SECURE,
            path="/"
        )

        return response


# ──────────────────────────────────────────────
# SESSÃO
# ──────────────────────────────────────────────

# Endpoint simples para o frontend checar se o usuário ainda está autenticado
# O apiFetch chama isso para saber se precisa fazer refresh ou redirecionar para /login
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_session(request):
    return JsonResponse({"status": "ok", "user": request.user.username}, status=status.HTTP_200_OK)


# ──────────────────────────────────────────────
# SOLICITAÇÃO DE AMIZADE
# ──────────────────────────────────────────────
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_request(request, user_id):
    if request.user.id == user_id:
        return Response({'error': "Você não pode adicionar a si mesmo"}, status=status.HTTP_400_BAD_REQUEST)

    exists = FriendRequests.objects.filter(sender=request.user, receiver_id=user_id).exists()

    if exists:
        return Response({'error': 'Solicitação já enviada'}, status=status.HTTP_400_BAD_REQUEST)

    friends_request = FriendRequests.objects.create(sender=request.user, receiver_id=user_id)

    serializer = FriendsRequestsSerializer(friends_request)

    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_requests(request):
    requests = FriendRequests.objects.filter(receiver=request.user, status=FriendRequests.PENDING)

    serializer = FriendsRequestsSerializer(requests, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def accept_request(request, request_id):
    try:
        friend_request = FriendRequests.objects.get(id=request_id, receiver=request.user, status=FriendRequests.PENDING)
    except FriendRequests.DoesNotExist:
        return Response({'error': 'Solicitação não encontrada'}, status=status.HTTP_404_NOT_FOUND)

    friend_request.status = FriendRequests.ACCEPTED
    friend_request.save()

    return Response({'message': 'Solicitação de amizade aceita'}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def reject_request(request, request_id):
    try:
        friend_request = FriendRequests.objects.get(id=request_id, receiver=request.user, status=FriendRequests.PENDING)
    except FriendRequests.DoesNotExist:
        return Response({'error': 'Solicitação não encontrada'}, status=status.HTTP_404_NOT_FOUND)

    friend_request.delete()

    return Response({'message': 'Solicitação de amizade aceita'}, status=status.HTTP_200_OK)
