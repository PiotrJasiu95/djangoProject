from django.contrib import admin

# Register your models here.
from ztp5.models import *

admin.site.register(MenuModel)
admin.site.register(DishModel)
admin.site.register(IngredientModel)
admin.site.register(Order)