from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.viewsets import ModelViewSet

from posts.models import Posts
from posts.serializers.posts import PostsSerializer


# Create your views here.

# Classe automatizada, cria métodos (putch, post...) automaticamente (de acordo com a URL)
class PostViewSet(ModelViewSet):
    queryset = Posts.objects.all()
    serializer_class = PostsSerializer
    http_method_names = ['get','post', 'put', 'delete', 'patch']

    # Quero filtrar por slug ao invés de ID
    lookup_field = 'slug'

    # Tem que estar autenticado
    permission_classes = [IsAuthenticated]

    # Filtrar Posts para mostrar apenas quando is_published for True
    # Caso a pessoa use uma query string ?author=maxdias ela vai para a variável author
    # Se author for True, ele faz um filtro dos posts de acordo com o usuário
    def get_queryset(self):
        qs = Posts.objects.select_related('user').filter(is_published=True)

        author = self.request.query_params.get('author')

        if author:
            qs = qs.filter(user__username=author)

        return qs

    # Antes de salvar no banco, deixa eu ajustar alguma coisa
    # Não é ideal usar no método save() do Model, pois ele não tem o método request.user
    # Estou criando o post e o usuário é o que está enviando o post (tem que estar logado)
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
