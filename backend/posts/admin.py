from django.contrib import admin

from posts.models import Posts

# Register your models here.

class PostsAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'is_published')
    list_filter = ('is_published',)
    search_fields = ('user__username',)
    list_per_page = 100

admin.site.register(Posts, PostsAdmin)
