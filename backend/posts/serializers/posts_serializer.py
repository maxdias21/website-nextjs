from django.contrib.contenttypes.models import ContentType
from rest_framework import serializers

from friends.serializers.user_serializer import UserSerializer
from likes.models import Likes
from ..models import Posts


class PostsSerializer(serializers.ModelSerializer):
    # Campo apenas para leitura e estou buscando o nome de usuário do model User
    user = UserSerializer(read_only=True)

    # Eu criei esses 2 campos para colocar allow_blank True para mostrar minha mensagem de erro personalizada
    # Se eu não criasse esse campo, ele mostraria uma mensagem em inglês (eu poderia simplesmente no model colocar
    # allow_blank ou blank no campo e não precisaria fazer isso aqui abaixo.
    content = serializers.CharField(allow_blank=True)
    photo = serializers.ImageField(required=False)

    likes_count = serializers.IntegerField(read_only=True)
    dislikes_count = serializers.IntegerField(read_only=True)
    is_liked = serializers.BooleanField(read_only=True)
    is_disliked = serializers.BooleanField(read_only=True)

    class Meta:
        model = Posts
        exclude = ('is_published', )


    def validate(self, attrs):
        import os

        content = attrs.get('content')
        photo = attrs.get('photo')


        errors = {}

        if not photo:
            errors['photo'] = 'Foto é obrigatorio'
        else:
                ext_photos = ['.jpg', '.jpeg', '.png']
                ext = os.path.splitext(photo.name)[1].lower()
                if ext not in ext_photos:
                    errors['photo']= 'Formato da foto inválido, envie um arquivo .jpg, .jpeg ou .png'

        if len(str(content.strip())) > 500:
            errors['content'] = 'Campo tem que ter no máximo 500 caracteres'

        if len(str(content).strip()) < 10:
            errors['content'] = 'Campo tem que ter no mínimo 10 caracteres'

        if errors:
            raise serializers.ValidationError(errors)

        return attrs


