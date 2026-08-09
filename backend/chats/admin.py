from django.contrib import admin

from chats.models import Chats, Message

# Register your models here.


admin.site.register(Chats)
admin.site.register(Message)
