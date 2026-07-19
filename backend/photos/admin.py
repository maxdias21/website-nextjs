from django.contrib import admin

from photos.models import Photos

# Register your models here.

class PhotosAdmin(admin.ModelAdmin):
    list_display = ('id','user', 'get_short_name')
    search_fields = ('user__username', 'user__first_name', 'user__last_name')
    ordering = ('user__username',)
    list_per_page = 100

    def get_short_name(self, obj):
        return f'{obj.photo.url[0:50]}'

admin.site.register(Photos, PhotosAdmin)
