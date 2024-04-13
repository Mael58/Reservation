from django.contrib import admin
from .models import Room, Reservation

class ReservationAdmin(admin.ModelAdmin):
    
    model = Reservation  
    
class RoomAdmin(admin.ModelAdmin):   
    model = Room

    
    
admin.site.register(Room, RoomAdmin)
admin.site.register(Reservation, ReservationAdmin)



