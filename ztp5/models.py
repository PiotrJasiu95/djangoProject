from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class MenuModel(models.Model):
    pass


class DishModel(models.Model):
    name = models.CharField(max_length=300, blank=True, null=True)
    Menu = models.ForeignKey(MenuModel, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=6, decimal_places=2, blank=True, null=True)

    def __str__(self):
        return self.name


class IngredientModel(models.Model):
    ingredient = models.CharField(max_length=30, blank=True, null=True)
    dish = models.ForeignKey(DishModel, on_delete=models.CASCADE)

    def __str__(self):
        return self.ingredient


class Order(models.Model):
    description = models.CharField(max_length=100, blank=True, null=True)
    dish = models.ManyToManyField(to=DishModel)
    status = models.CharField(max_length=30, blank=True, null=True)
    adres_1 = models.CharField(max_length=30, blank=True, null=True)
    adres_2 = models.CharField(max_length=30, blank=True, null=True)
    data = models.DateTimeField(auto_now=True, blank=True, null=True)
    user = models.ForeignKey(User, blank=True, null=True, on_delete=models.CASCADE)