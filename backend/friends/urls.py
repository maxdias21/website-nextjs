from django.urls import path

from friends.views import SendFriendRequestView, AcceptFriendView, RejectFriendsView, ListFriendsView, ListPeople

urlpatterns = [
    path('send/', SendFriendRequestView.as_view()),
    path('accepted/', AcceptFriendView.as_view()),
    path('rejected/', RejectFriendsView.as_view()),
    path('list/', ListFriendsView.as_view()),
    path('listPeople/', ListPeople.as_view()),
]
