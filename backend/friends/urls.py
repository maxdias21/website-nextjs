from django.urls import path

from friends.views import AcceptFriendRequestView, RejectOrRemoveFriendView, ListFriendsView, SuggestedPeopleView, \
    ReceivedFriendRequestsView, SendFriendRequestView, SentFriendRequestsView

urlpatterns = [
    path('send/', SendFriendRequestView.as_view()),
    path('accept/', AcceptFriendRequestView.as_view()),
    path('reject/', RejectOrRemoveFriendView.as_view()),
    path('list/friends/', ListFriendsView.as_view()),
    path('list/people/', SuggestedPeopleView.as_view()),
    path('list/pending/', ReceivedFriendRequestsView.as_view()),
    path('sent/pending/', SentFriendRequestsView.as_view()),

]
