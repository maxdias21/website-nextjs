from rest_framework import routers

from stories.views import StoriesViewSet

router = routers.DefaultRouter()
router.register(r'stories', StoriesViewSet, basename='stories')

urlpatterns = []
urlpatterns += router.urls