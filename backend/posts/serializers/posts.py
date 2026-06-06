from rest_framework import serializers
from ..models import Posts


class PostsSerializer(serializers.ModelSerializer):
    # Campo apenas para leitura e estou buscando o nome de usuário do model User
    user = serializers.ReadOnlyField(source='user.username')

    # Eu criei esses 2 campos para colocar allow_blank True para mostrar minha mensagem de erro personalizada
    # Se eu não criasse esse campo, ele mostraria uma mensagem em inglês (eu poderia simplesmente no model colocar
    # allow_blank ou blank no campo e não precisaria fazer isso aqui abaixo.
    content = serializers.CharField(allow_blank=True)
    photo = serializers.ImageField(required=True, error_messages={
        "required": "Foto é obrigatória",
    })

    class Meta:
        model = Posts
        exclude = ('is_published',)

    def validate_content(self, value):
        if len(str(value.strip())) > 500:
            raise serializers.ValidationError("Campo tem que ter no máximo 100 caracteres")

        if len(str(value).strip()) < 10:
            raise serializers.ValidationError("Campo tem que ter no mínimo 10 caracteres")

        return value

    def validate_photo(self, value):
        import os

        ext_photos = ['.jpg', '.jpeg', '.png']

        ext = os.path.splitext(value.name)[1].lower()

        if ext not in ext_photos:
            raise serializers.ValidationError("Arquivo inválido, tente novamente")

        return value

