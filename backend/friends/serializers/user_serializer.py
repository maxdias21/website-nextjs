from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.serializers import ValidationError

from profiles.models import Profiles


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profiles
        fields = ['id', 'profile_pic', 'bio', 'birth_state', 'current_state','visibility']


class UserSerializer(serializers.ModelSerializer):
    profiles = ProfileSerializer(read_only=True)
    email = serializers.EmailField(read_only=True)
    username = serializers.CharField(read_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'profiles', 'password']

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)

        if password:
            instance.set_password(password)

        return super().update(instance, validated_data)

    def validate(self, attrs):
        first_name = attrs.get('first_name', "")
        last_name = attrs.get('last_name', "")
        password = attrs.get('password', "")

        errors = {}

        if 'first_name' in attrs:
            if len(first_name) < 2:
                errors['first_name'] = 'O nome deve ser maior de 2 caracteres'

            if len(first_name) > 100:
                errors['first_name'] = 'O nome deve ter menos que 100 caracteres'

        if 'last_name' in attrs:
            if len(last_name) < 2:
                errors['last_name'] = 'O sobrenome deve ser maior de 2 caracteres'

            if len(last_name) > 100:
                errors['last_name'] = 'O sobrenome deve ter menos que 100 caracteres'

        if password:
            if len(password) < 6:
                errors['password'] = 'O sobrenome deve ter menos que 100 caracteres'
            if len(password) > 50:
                errors['password'] = 'O sobrenome deve ter menos que 100 caracteres'

        if errors:
            raise ValidationError(errors)

        return attrs


class UserCreateSerializer(serializers.ModelSerializer):
    date_of_birth = serializers.DateField(write_only=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True, write_only=True)
    username = serializers.CharField(required=True)

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'date_of_birth', 'password']

    def create(self, validated_data):
        date_of_birth = validated_data.pop('date_of_birth')

        user = User.objects.create_user(**validated_data)
        Profiles.objects.create(user=user, date_of_birth=date_of_birth)

        return user

    def validate(self, attrs):
        user = User.objects.filter(username=attrs['username']).exists()
        email = User.objects.filter(email=attrs['email']).exists()

        fields = {
            "username": {"name": "usuário", "min_length": 5, "max_length": 40},
            "first_name": {"name": "nome", "min_length": 2, "max_length": 40},
            "last_name": {"name": "sobrenome", "min_length": 2, "max_length": 40},
            "email": {"name": "nome", "min_length": 6, "max_length": 100},
        }
        errors = []
        for field, rules in fields.items():
            value = attrs.get(field)

            if value:
                if (len(value) < rules["min_length"]):
                    errors.append(f'Campo {rules["name"]} precisa ter no mínimo {rules['min_length']} caracteres.')

                if (len(value) > rules["max_length"]):
                    errors.append(f'Campo {rules["name"]} precisa ter no máximo {rules['max_length']} caracteres.')

        if user:
            errors.append("Usuário já existe.")

        if email:
            errors.append("Email já existe.")

        if errors:
            raise ValidationError(errors)

        return attrs
