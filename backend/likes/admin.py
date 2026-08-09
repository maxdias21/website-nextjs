from django.contrib import admin

from likes.models import Likes

# Register your models here.

class LikesAdmin(admin.ModelAdmin):
    list_display = ('user', 'content_type', 'object_id', 'value')
    list_filter = ('value',)
    list_per_page = 100
    search_fields = ('user__username', 'value')

admin.site.register(Likes, LikesAdmin)