from rest_framework import serializers
from rest_framework.fields import ReadOnlyField

from ztp5.models import DishModel
from ztp5.models import IngredientModel
from ztp5.models import MenuModel


# name = serializers.RelatedField(source='ingredient', read_only=True)

class newSerializer(serializers.ModelSerializer):
    #name2 = serializers.RelatedField(source='IngredientModel.ingredient', read_only=True)

    class Meta:
        model = DishModel
        fields = ['name']


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = IngredientModel
        fields = '__all__'


class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuModel
        fields = ['name']


class DishSerializerWithIngredients(serializers.ModelSerializer):
    # ingredient = IngredientSerializer(many=True, read_only=True)
    category_name = ReadOnlyField(source='dish.name')
    class Meta:
        model = IngredientModel
        fields = ['category_name','ingredient']
