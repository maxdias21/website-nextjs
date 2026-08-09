from django.urls import path

from likes.views import LikesViewSet


urlpatterns = [
    path('likes/', LikesViewSet.as_view())
]