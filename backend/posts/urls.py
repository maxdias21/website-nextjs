from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import PostViewSet

# Usado para criar automaticamente nossas rotas (put,delet,get...)
router = DefaultRouter()
router.register(r'posts', PostViewSet, basename='posts')

urlpatterns = [
    path('', include(router.urls)),
]