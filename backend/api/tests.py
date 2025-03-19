from decimal import Decimal

from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from .models import *


class TestVuesAuth(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url_inscription = reverse("register")
        self.url_obtenir_token = reverse("token-obtain")
        self.url_rafraichir_token = reverse("token-refresh")

        # Créer utilisateur de test
        self.utilisateur_test = {
            "username": "utilisateur_test",
            "password": "motdepasse123",
        }

    def test_inscription_utilisateur(self):
        """Tester l'endpoint d'inscription"""
        reponse = self.client.post(self.url_inscription, self.utilisateur_test)
        self.assertEqual(reponse.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().username, "utilisateur_test")

    def test_obtenir_token(self):
        """Tester l'endpoint d'obtention de token"""
        # Créer un utilisateur d'abord
        User.objects.create_user(username="utilisateur_test", password="motdepasse123")

        # Obtenir le token
        reponse = self.client.post(self.url_obtenir_token, self.utilisateur_test)
        self.assertEqual(reponse.status_code, status.HTTP_200_OK)
        self.assertIn("access", reponse.data)
        self.assertIn("refresh", reponse.cookies)

    def test_rafraichir_token(self):
        """Tester l'endpoint de rafraîchissement de token"""
        # Créer un utilisateur d'abord
        User.objects.create_user(username="utilisateur_test", password="motdepasse123")

        # Obtenir le token
        self.client.post(self.url_obtenir_token, self.utilisateur_test)

        # Rafraîchir le token
        reponse_rafraichie = self.client.post(self.url_rafraichir_token)
        self.assertEqual(reponse_rafraichie.status_code, status.HTTP_200_OK)
        self.assertIn("access", reponse_rafraichie.data)


class TestModels(TestCase):
    def setUp(self):
        """Configuration initiale pour les tests"""
        self.utilisateur = User.objects.create_user(
            username="utilisateur_test", password="motdepasse123"
        )

        self.budget = Budget.objects.create(
            utilisateur=self.utilisateur,
            montant_max=Decimal("1000.00"),
        )

    def test_creation_budget(self):
        """Tester la création d'un budget"""
        self.assertEqual(self.budget.montant_max, Decimal("1000.00"))
        self.assertEqual(self.budget.montant_actuel, Decimal("1000.00"))
        self.assertEqual(self.budget.utilisateur, self.utilisateur)

    def test_creation_transaction_depense(self):
        """Tester la création d'une transaction de type dépense"""
        transaction = Transaction.objects.create(
            utilisateur=self.utilisateur,
            montant=Decimal("150.00"),
            type="dépense",
            categorie="nourriture",
            description="Courses hebdomadaires",
        )

        # Vérifier que le montant actuel du budget a été mis à jour
        self.budget.refresh_from_db()
        self.assertEqual(self.budget.montant_actuel, Decimal("850.00"))
        self.assertEqual(transaction.type, "dépense")
        self.assertEqual(transaction.categorie, "nourriture")
        self.assertEqual(self.budget.montant_max, Decimal("1000.00"))

    def test_creation_transaction_revenu(self):
        """Tester la création d'une transaction de type revenu"""
        transaction = Transaction.objects.create(
            utilisateur=self.utilisateur,
            montant=Decimal("500.00"),
            type="revenu",
            categorie="autres",  # Sera automatiquement changé en "salaires"
            description="Salaire mensuel",
        )

        # Vérifier que le montant actuel du budget a été mis à jour
        self.budget.refresh_from_db()
        self.assertEqual(self.budget.montant_actuel, Decimal("1500.00"))
        self.assertEqual(transaction.type, "revenu")
        self.assertEqual(transaction.categorie, "salaires")


class TestVuesTransactions(TestCase):
    def setUp(self):
        """Configuration initiale pour les tests"""
        self.client = APIClient()
        self.url_transactions = reverse("transactions-list-create")
        self.url_transaction_detail = reverse("transaction-detail", kwargs={"pk": 1})
        self.utilisateur = User.objects.create_user(
            username="utilisateur_test", password="motdepasse123"
        )
        self.budget = Budget.objects.create(
            utilisateur=self.utilisateur,
            montant_max=Decimal("1000.00"),
            montant_actuel=Decimal("1000.00"),
        )

    def test_ajouter_transaction(self):
        """Tester l'ajout d'une transaction"""
        transaction_data = {
            "montant": "150.00",
            "type": "revenu",
            "categorie": "autres",
            "description": "Salaire mensuel",
        }
        self.client.force_authenticate(user=self.utilisateur)
        reponse = self.client.post(self.url_transactions, transaction_data)
        print(reponse.data)
        self.assertEqual(reponse.status_code, status.HTTP_201_CREATED)
        print(Transaction.objects.count())
        self.assertEqual(Transaction.objects.count(), 1)
        self.assertEqual(Transaction.objects.get().montant, Decimal("150.00"))
        self.assertEqual(Transaction.objects.get().type, "revenu")
        self.assertEqual(Transaction.objects.get().categorie, "salaires")
        self.assertEqual(self.budget.montant_actuel, Decimal("1150.00"))

    def test_lister_transactions(self):
        """Tester la liste des transactions"""
        transaction_data = {
            "montant": "150.00",
            "type": "revenu",
            "categorie": "autres",
            "description": "Salaire mensuel",
        }
        self.client.force_authenticate(user=self.utilisateur)
        self.client.post(self.url_transactions, transaction_data)
        reponse = self.client.get(self.url_transactions)
        self.assertEqual(reponse.status_code, status.HTTP_200_OK)
        print(reponse.data)
        self.assertEqual(len(reponse.data), 1)
