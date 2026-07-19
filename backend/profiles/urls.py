from django.urls import  path
from rest_framework.routers import DefaultRouter

from .views import ProfileApiView, check_session, CustomObtainPairView, CustomTokenRefreshView, get_users, CreateUser, \
    ProfileFriendViewSet

router = DefaultRouter()
router.register('profiles', ProfileApiView)
router.register('profile-friends', ProfileFriendViewSet, basename="profile-friends")

urlpatterns = [
    path('login/', CustomObtainPairView.as_view(), name='login'),
    path('refresh/', CustomTokenRefreshView.as_view(), name='refresh'),
    path("check-session/", check_session),
    path('get-users/', get_users),
    path('create-user/', CreateUser.as_view()),
]

urlpatterns += router.urls