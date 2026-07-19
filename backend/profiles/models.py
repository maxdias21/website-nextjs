from datetime import date

from django.contrib.auth.models import User
from django.db import models


# Create your models here.

class Profiles(models.Model):
    # Gênero
    MALE = "M"
    FEMALE = "F"
    OTHER = "O"
    GENDER_CHOICES = [
        (MALE, "Masculino"),
        (FEMALE, "Feminino"),
        (OTHER, "Outro"),
    ]

    # Estados do Brasil
    STATES_CHOICES = [
        ("AC", "Acre"),
        ("AL", "Alagoas"),
        ("AP", "Amapá"),
        ("AM", "Amazonas"),
        ("BA", "Bahia"),
        ("CE", "Ceará"),
        ("DF", "Distrito Federal"),
        ("ES", "Espírito Santo"),
        ("GO", "Goiás"),
        ("MA", "Maranhão"),
        ("MT", "Mato Grosso"),
        ("MS", "Mato Grosso do Sul"),
        ("MG", "Minas Gerais"),
        ("PA", "Pará"),
        ("PB", "Paraíba"),
        ("PR", "Paraná"),
        ("PE", "Pernambuco"),
        ("PI", "Piauí"),
        ("RJ", "Rio de Janeiro"),
        ("RN", "Rio Grande do Norte"),
        ("RS", "Rio Grande do Sul"),
        ("RO", "Rondônia"),
        ("RR", "Roraima"),
        ("SC", "Santa Catarina"),
        ("SP", "São Paulo"),
        ("SE", "Sergipe"),
        ("TO", "Tocantins"),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField()
    profile_pic = models.ImageField(upload_to='profile_pics', blank=True, null=True)
    background_pic = models.ImageField(upload_to='background_pics', blank=True, null=True)
    date_of_birth = models.DateField(default=date.today)
    gender = models.CharField(choices=GENDER_CHOICES, max_length=1, blank=True, null=True)
    birth_state = models.CharField(choices=STATES_CHOICES, max_length=2, blank=True, null=True)
    current_state = models.CharField(choices=STATES_CHOICES, max_length=2, blank=True, null=True)

    PUBLIC = "Public"
    PRIVATE = "Private"
    VISIBILITY_CHOICES = [(PUBLIC, "Public"), (PRIVATE, "Private")]
    visibility = models.CharField(choices=VISIBILITY_CHOICES, default=PUBLIC, max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.user.first_name} {self.user.last_name}'

    class Meta:
        verbose_name_plural = 'Profiles'
        verbose_name = 'Profile'
