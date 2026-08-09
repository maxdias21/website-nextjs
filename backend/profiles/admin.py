from django.contrib import admin
from .models import Profiles


# Register your models here.

class ProfilesAdmin(admin.ModelAdmin):
    list_display = ('user', 'get_full_name', 'gender', 'visibility')
    list_filter = ('gender', 'visibility')
    search_fields = ('user__username', 'user__first_name', 'user__last_name')
    ordering = ('user__username',)
    list_per_page = 100

    def get_full_name(self, obj):
        return f'{obj.user.first_name} {obj.user.last_name}'

    get_full_name.short_description = 'Name'


admin.site.register(Profiles, ProfilesAdmin)
