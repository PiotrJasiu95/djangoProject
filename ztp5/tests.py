from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase
from .models import *
from django.http import QueryDict


# Create your tests here.

class UnitTests(APITestCase):

    # wykonuje się przed każdym testem
    def setUp(self) -> None:
        self.user = User.objects.create_user(username='testuser', password='12345', email="test@email.com")
        self.test_admin = User.objects.create_superuser(username='testadmin', password='12345', id=3,
                                                        email="test@email.com")
        self.client.login(username='testadmin', password='12345')
        self.client.force_authenticate(user=self.test_admin)

    def tearDown(self) -> None:
        self.user.delete()
        self.test_admin.delete()
        self.client.logout()

    def test_post_dish(self):
        MenuModel.objects.create()
        response = self.client.post('/post_dish/', data={"name": "Burger",
                                                         "menu": 1,
                                                         "tmp": "mieso bylki surwukla",
                                                         "price": 123})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_dish_incorrect(self):
        MenuModel.objects.create()
        response = self.client.post('/post_dish/', data={"name": "Burger",
                                                         "tmp": "mieso bylki surwukla"})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_get_dish(self):
        MenuModel.objects.create()
        response = self.client.get('/get_dish/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_dish_incorrect(self):
        MenuModel.objects.create()
        response = self.client.post('/get_dish/')
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_delete_dish(self):
        MenuModel.objects.create()
        # dodanie
        response = self.client.post('/post_dish/', data={"name": "Burger",
                                                         "menu": 1,
                                                         "tmp": "mieso bylki surwukla",
                                                         "price":123})
        # usuwanie
        response = self.client.post('/delete_dish/', data={"id": 1})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_dish_incorrect(self):
        MenuModel.objects.create()
        # dodanie
        response = self.client.post('/post_dish/', data={"name": "Burger",
                                                         "menu": 1,
                                                         "tmp": "mieso bylki surwukla"})
        # usuwanie
        response = self.client.post('/delete_dish/', data={"id": 2})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_ingredient(self):
        MenuModel.objects.create()
        response = self.client.post('/post_dish/', data={"name": "Burger",
                                                         "menu": 1,
                                                         "tmp": "mieso bylki surwukla",
                                                         "price": 123})
        response = self.client.post('/post_ingredient/', data={"ingredient": "Ser",
                                                               "dish": 1})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_ingredient_incorrect(self):
        MenuModel.objects.create()
        response = self.client.post('/post_dish/', data={"name": "Burger",
                                                         "menu": 1,
                                                         "tmp": "mieso bylki surwukla"})
        response = self.client.post('/post_ingredient/', data={"ingredient": "Ser",
                                                               "dish": 2})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_get_menu(self):
        MenuModel.objects.create()
        response = self.client.get('/get_menu/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_menu_incorrect(self):
        MenuModel.objects.create()
        response = self.client.post('/get_menu/')
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

