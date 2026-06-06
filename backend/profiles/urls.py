from django.urls import  path
from .views import ProfileApiView, check_session, CustomObtainPairView, CustomTokenRefreshView, get_users


urlpatterns = [
    path('login/', CustomObtainPairView.as_view(), name='login'),
    path('refresh/', CustomTokenRefreshView.as_view(), name='refresh'),
    path("check-session/", check_session),
    path('get-users/', get_users)
]