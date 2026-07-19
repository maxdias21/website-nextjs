from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import PostsViewSet, all_posts

# Usado para criar automaticamente nossas rotas (put,delet,get...)
router = DefaultRouter()
router.register(r'posts', PostsViewSet, basename='posts')

urlpatterns = [
    path('', include(router.urls)),
    path('all-posts/', all_posts)
]