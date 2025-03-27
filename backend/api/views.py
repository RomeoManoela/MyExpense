from datetime import datetime, timedelta

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView

from .models import *
from .serializer import UserSerializer, TransactionSerializer, BudgetSerializer


class InfoUtilisateurAPIView(APIView):
    """Vue pour obtenir l'info d'un utilisateur"""

    permission_classes = [IsAuthenticated]

    def get(self, request: Request) -> Response:
        try:
            budget = request.user.budget
        except Budget.DoesNotExist:
            budget = type("obj", (object,), {"montant_actuel": 0, "montant_max": 0})
        return Response(
            {
                "username": request.user.username,
                "budget": {
                    "solde": budget.montant_actuel,
                    "depense": budget.montant_max - budget.montant_actuel,
                    "budget": budget.montant_max,
                },
            }
        )


class CreationUtilisateurAPIView(generics.CreateAPIView):
    """Vue pour créer un nouvel utilisateur"""

    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class DeconnectionAPIView(APIView):
    """Vue pour déconnecter un utilisateur"""

    permission_classes = [IsAuthenticated]

    def post(self, request: Request) -> Response:
        request.COOKIES.pop("refresh")
        return Response({"message": "Déconnecté avec succès"})


class PersonnaliseeRafraichirTokenAPIView(TokenRefreshView):
    """Vue personnalisée pour rafraîchir un token JWT"""

    def post(self, request: Request, *args, **kwargs) -> Response:
        """
        Surcharge de la méthode post pour récupérer le refresh token depuis les cookies
        """
        request._full_data = {"refresh": request.COOKIES.get("refresh")}
        reponse: Response = super().post(request, *args, **kwargs)
        return reponse


class PersonnaliseeObtenirTokenAPIView(TokenObtainPairView):
    """Vue personnalisée pour obtenir un token JWT"""

    permission_classes = [AllowAny]

    def post(self, request: Request, *args, **kwargs) -> Response:
        """
        Surcharge de la méthode post pour stocker le refresh token dans un cookie http only
        pour plus de sécurité et ne renvoyer que l'access token dans le corps de la réponse
        """
        reponse: Response = super().post(request, *args, **kwargs)
        token_rafraichissement = reponse.data.pop("refresh")
        reponse.set_cookie(
            key="refresh",
            value=token_rafraichissement,
            httponly=True,
            secure=False,
            samesite="Lax",
            max_age=3600 * 24 * 30,  # 30 jours
        )
        return reponse


class AjouterListerTransactionAPIView(generics.ListCreateAPIView):
    """Vue pour ajouter ou lister les transactions"""

    permission_classes = [IsAuthenticated]
    serializer_class = TransactionSerializer

    def perform_create(self, serializer):
        serializer.save(utilisateur=self.request.user)

    def get_queryset(self):
        return Transaction.objects.filter(utilisateur=self.request.user)


class RetrouverTransactionsAPIView(generics.RetrieveUpdateDestroyAPIView):
    """Vue pour retrouver une transaction d'un utilisateur"""

    permission_classes = [IsAuthenticated]
    serializer_class = TransactionSerializer
    lookup_field = "pk"

    def get_queryset(self):
        return Transaction.objects.filter(utilisateur=self.request.user)


class AjouterListerBudgetAPIView(generics.ListCreateAPIView):
    """Vue pour ajouter ou lister les budgets"""

    permission_classes = [IsAuthenticated]
    serializer_class = BudgetSerializer

    def perform_create(self, serializer):
        if not Budget.objects.filter(utilisateur=self.request.user).exists():
            serializer.save(utilisateur=self.request.user)

    def get_queryset(self):
        try:
            return Budget.objects.filter(utilisateur=self.request.user)
        except:
            return Budget.objects.none()


class ModifierBudgetAPIView(generics.UpdateAPIView):
    """Vue pour modifier le budget d'un utilisateur"""

    permission_classes = [IsAuthenticated]
    serializer_class = BudgetSerializer
    lookup_field = "pk"

    def get_queryset(self):
        return Budget.objects.filter(utilisateur=self.request.user)


class AnalyticsAPIView(APIView):
    """Vue pour obtenir les données d'analyse des transactions"""

    permission_classes = [IsAuthenticated]

    def get(self, request: Request) -> Response:
        transactions = Transaction.objects.filter(utilisateur=request.user)

        # Données pour le graphique en camembert (répartition par catégorie)
        categories_data = {}
        for transaction in transactions:
            if transaction.type == "dépense":
                if transaction.categorie in categories_data:
                    categories_data[transaction.categorie] += transaction.montant
                else:
                    categories_data[transaction.categorie] = transaction.montant

        # Données pour le graphique linéaire (dépenses quotidiennes)
        today = datetime.now().date()
        last_7_days = [(today - timedelta(days=i)) for i in range(6, -1, -1)]

        daily_expenses = []
        for day in last_7_days:
            day_total = sum(
                t.montant for t in transactions if t.type == "dépense" and t.date == day
            )
            daily_expenses.append(
                {"date": day.strftime("%Y-%m-%d"), "montant": day_total}
            )

        return Response(
            {
                "categories": [
                    {"categorie": k, "montant": v} for k, v in categories_data.items()
                ],
                "daily_expenses": daily_expenses,
            }
        )
