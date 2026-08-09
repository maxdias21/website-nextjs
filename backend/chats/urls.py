from rest_framework.routers import DefaultRouter

from chats.views import ChatsViewSet

router = DefaultRouter()
router.register('chats', ChatsViewSet)

urlpatterns = [

]

urlpatterns += router.urls