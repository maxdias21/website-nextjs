from django.contrib import admin

from friends.models import FriendsRequest


# Register your models here.

class AdminFriendsRequest(admin.ModelAdmin):
    list_display = ["from_user", "to_user", "status"]
    search_fields=["from_user__username", "to_user__username", "status"]
    list_filter = ["status",]
    list_per_page = 100


admin.site.register(FriendsRequest, AdminFriendsRequest)


