from django.urls import  path, include

from .models import FriendRequests
from .views import ProfileApiView, check_session, CustomObtainPairView, CustomTokenRefreshView, get_users, send_request, \
    list_requests, accept_request, reject_request

from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'profiles', ProfileApiView, basename='profiles')

urlpatterns = [
    path('login/', CustomObtainPairView.as_view(), name='login'),
    path('refresh/', CustomTokenRefreshView.as_view(), name='refresh'),
    path("check-session/", check_session),
    path('get-users/', get_users),
    path('', include(router.urls)),

    # SOlicitações de amizade
    path('friends/request/<int:user_id>/', send_request),
    path('friends/accept/<int:user_id>/', accept_request),
    path('friends/reject/<int:user_id>/', reject_request),
    path('friends/request/', list_requests),
]