from django.contrib.auth.models import User
from django.shortcuts import render
from django.utils.datastructures import MultiValueDictKeyError
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.response import Response
from ztp5.serializer import *

from ztp5.models import *
# Create your views here.
from rest_framework.decorators import api_view, permission_classes, authentication_classes


@api_view(['POST'])
@permission_classes([AllowAny])
def post_dish(request):
    print(request.data)
    try:
        name = request.data['name']
        menu = request.data['menu']
        tmp = request.data['tmp']
        price = request.data['price']
    except MultiValueDictKeyError:
        return Response(status=400)

    try:
        # dishSerializer = IngredientSerializer(data=request.data)
        i = DishModel.objects.create(name=name, Menu_id=menu,price=price)
        IngredientModel.objects.create(ingredient=tmp, dish_id=i.id)
    except Exception:
        # if dishSerializer.is_valid():
        #    dishSerializer.save()
        return Response("blad tworzenia", status=400)
    return Response(status=200)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_dish(request):
    try:
        dishes = DishModel.objects.values()

    except Exception:
        return Response("blad tworzenia", status=400)

    response = []
    for d in dishes:
        ingredients = IngredientModel.objects.filter(dish__id=d['id'])
        d['ingredients'] = ingredients.values_list('ingredient', flat=True)
        print(ingredients.values_list('ingredient', flat=True))

    return Response(status=200, data=dishes)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def delete_dish(request):
    try:
        id = request.data['id']
    except MultiValueDictKeyError:
        return Response('missing data in request',status=400)
    try:
        dish = DishModel.objects.get(id=id)
        dish.delete()
    except Exception as e:
        return Response("blad tworzenia", status=400)
    return Response(status=200)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def post_ingredient(request):
    try:
        ingredient = request.data['ingredient']
        dish = request.data['dish']
    except MultiValueDictKeyError:
        return Response('missing data in request',status=400)
    try:
        d = DishModel.objects.get(id=dish)
    except Exception as e:
        return Response("Brak danego menu", status=400)
    try:
        IngredientModel.objects.create(ingredient=ingredient, dish_id=dish)
    except Exception as e:

        return Response("blad tworzenia", status=400)

    return Response(status=200)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_ingredients(request):
    try:
        dish = request.data['dish']
    except Exception as e:
        return Response("brak disha", status=404)
    try:
        ingredients = IngredientModel.objects.filter(dish_id=dish)
    except Exception as e:
        print(e)
        return Response("blad tworzenia", status=400)
    try:
        serializer = IngredientSerializer(ingredients, many=True)
    except Exception as e:
        return Response("blad tworzenia", status=400)
    return Response(status=200, data=serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def add_menu(request):
    try:
        menu = MenuModel.objects.create()
    except Exception:
        return Response("blad tworzenia", status=400)
    newSerializer2 = newSerializer(menu, many=True)
    return Response(status=200, data=newSerializer2.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_menu(request):
    try:
        MenuModel.objects.create()
    except Exception:
        return Response("blad tworzenia", status=400)

    return Response(status=200)


@api_view(['POST'])
@permission_classes([AllowAny])
def create_user(request):
    try:
        name = request.data['username']
        password = request.data['password']
    except MultiValueDictKeyError:
        return Response('missing data in request',status=400)

    try:
        user = User.objects.create(username=name)
        user.set_password(password)
        user.is_active = True
        user.save()
    except Exception as e:
        return Response("blad tworzenia", status=400)

    return Response(status=200)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    try:
        description = request.data['description']
        dish = request.data['dish']
        user = request.user
        adres_1 = request.data['adres_1']
        adres_2 = request.data['adres_2']
    except MultiValueDictKeyError:
        return Response('missing data in request',status=400)

    try:
        order = Order.objects.create(description=description, user=user, status="Order Placed", adres_1=adres_1,
                                     adres_2=adres_2)

        dishes = DishModel.objects.filter(id__in=dish).values_list("id", flat=True)
        for dish in dishes:
            order.dish.add(dish)

        order.save()
    except Exception  as e:
        return Response(str(e), status=400)

    return Response(status=200)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_order(request):
    user = request.user

    try:
        response = []
        if user.id == 3:
            order = Order.objects.all().values('status', 'dish__name', 'data', 'id', 'dish__price')
        else:
            order = Order.objects.filter(user=user).values('status', 'dish__name', 'data', 'id','dish__price')

        for i in order:
            if i["id"] != next((item['id'] for item in response if item["id"] == i["id"]), False):
                response.append({"status": i['status'],
                                 "dish": i['dish__name'],
                                 "total":i['dish__price'],
                                 'time': str(i['data']).split('T')[0].split('.')[0],
                                 'id': i['id']})
            else:
                for j in response:
                    if j['id'] == i['id']:
                        print(i)
                        j['dish'] = j['dish'] + ", " + i['dish__name']
                        j['total'] += i['dish__price']


    except Exception  as e:
        print(e)
        return Response(str(e), status=400)

    return Response(data=response, status=200)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_order(request):
    try:
        id = request.data['id']
        status = request.data['status']
    except MultiValueDictKeyError:
        return Response('missing data in request',status=400)
    try:
        order = Order.objects.get(id=id)
        order.status = status
        order.save()

    except Exception  as e:
        print(e)
        return Response(str(e), status=400)

    return Response(status=200)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def delete_order(request):
    try:
        id = request.data['id']
    except MultiValueDictKeyError:
        return Response('missing data in request',status=400)
    try:
        dish = Order.objects.get(id=id)
        dish.delete()
    except Exception as e:
        return Response("blad tworzenia", status=400)
    return Response(status=200)
