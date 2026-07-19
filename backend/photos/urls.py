from rest_framework.routers import DefaultRouter

from photos.views import PhotosViewSet

router= DefaultRouter()
router.register(r'photos', PhotosViewSet, basename='photos')

urlpatterns = []
urlpatterns += router.urls