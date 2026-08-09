from django.contrib.auth.models import User
from django.contrib.contenttypes.models import ContentType
from django.db.models import Q, Prefetch, Count, Exists, OuterRef
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from friends.models import FriendsRequest
from likes.models import Likes
from posts.models import Posts
from posts.serializers.posts_serializer import PostsSerializer
from profiles.models import Profiles


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def all_posts(request):
    user = request.user
    content_type = ContentType.objects.get_for_model(Posts)

    user_liked = Likes.objects.filter(
        content_type=content_type,
        user=user,
        object_id=OuterRef('id'),
        value=1
    )

    user_disliked = Likes.objects.filter(
        content_type=content_type,
        user=user,
        object_id=OuterRef('id'),
        value=-1
    )

    posts = (Posts.objects.filter(is_published=True)
             .annotate(
        likes_count=Count('likes', filter=Q(likes__value=1)),
        dislikes_count=Count('likes', filter=Q(likes__value=-1)),
        is_liked=Exists(user_liked),
        is_disliked=Exists(user_disliked),
    )
             .prefetch_related('likes')
             .select_related('user')).order_by('-creat_at')

    serializer = PostsSerializer(posts, many=True, context={"request": request})

    return Response(serializer.data, status=status.HTTP_200_OK)


# Classe automatizada, cria métodos (putch, post...) automaticamente (de acordo com a URL)
class PostsViewSet(ModelViewSet):
    serializer_class = PostsSerializer
    http_method_names = ['get', 'post', 'put', 'delete', 'patch']
    # Quero filtrar por slug ao invés de ID
    lookup_field = 'slug'
    permission_classes = [IsAuthenticated]

    # Filtrar Posts para mostrar apenas quando is_published for True
    # Caso a pessoa use uma query string ?author=maxdias ela vai para a variável author
    # Se author for True, ele faz um filtro dos posts de acordo com o usuário
    def get_queryset(self):
        user = self.request.user
        content_type = ContentType.objects.get_for_model(Posts)

        friends_id = FriendsRequest.objects.filter(Q(from_user=user) | Q(to_user=user),
                                                   status=FriendsRequest.ACCEPTED).values_list('from_user', 'to_user')

        ids = set()
        for from_id, to_id in friends_id:
            ids.add(to_id if from_id == user.id else from_id)

        user_liked = Likes.objects.filter(
            content_type=content_type,
            user=user,
            object_id=OuterRef('id'),
            value=1
        )

        user_disliked = Likes.objects.filter(
            content_type=content_type,
            user=user,
            object_id=OuterRef('id'),
            value=-1
        )

        qs = Posts.objects.filter(
            Q(user=user) |
            Q(user_id__in=ids, is_published=True) |
            Q(user__profiles__visibility=Profiles.PUBLIC, is_published=True),
        ).annotate(
            likes_count=Count('likes', filter=Q(likes__value=1)),
            dislikes_count=Count('likes', filter=Q(likes__value=-1)),
            is_liked=Exists(user_liked),
            is_disliked=Exists(user_disliked),
        )

        author = self.request.query_params.get('author')
        mine = self.request.query_params.get('mine')

        if author:
            author = User.objects.get(username=author)
            qs = qs.filter(user=author)
        elif mine:
            qs = qs.filter(user=user)

        return qs.order_by('-creat_at')

    # Antes de salvar no banco, deixa eu ajustar alguma coisa
    # Não é ideal usar no método save() do Model, pois ele não tem o método request.user
    # Estou criando o post e o usuário é o que está enviando o post (tem que estar logado)
    def perform_create(self, serializer):
        serializer.save(user=self.request.user, is_published=True)
