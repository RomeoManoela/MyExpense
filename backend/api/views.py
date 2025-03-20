from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .models import *
from .serializer import UserSerializer, TransactionSerializer, BudgetSerializer


class InfoUtilisateurAPIView(APIView):
    """Vue pour obtenir les informations d'un utilisateur"""

    permission_classes = [IsAuthenticated]

    def get(self, request: Request) -> Response:
        return Response({"username": request.user.username})


class CreationUtilisateurAPIView(generics.CreateAPIView):
    """Vue pour créer un nouvel utilisateur"""

    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class VuePersonnaliseeObtenirToken(TokenObtainPairView):
    """Vue personnalisée pour obtenir un token JWT"""

    permission_classes = [AllowAny]

    def post(self, request: Request, *args, **kwargs) -> Response:
        """
        Surcharge de la méthode post pour stocker le refresh token dans un cookie
        et ne renvoyer que l'access token dans la réponse
        """
        reponse: Response = super().post(request, *args, **kwargs)
        token_rafraichissement = reponse.data["refresh"]
        reponse.set_cookie(
            key="refresh",
            value=token_rafraichissement,
            httponly=True,
            secure=False,
            samesite="Lax",
            max_age=3600 * 24 * 30,  # 30 jours
        )
        reponse.data.pop("refresh")
        return reponse


class VuePersonnaliseeRafraichirToken(TokenRefreshView):
    """Vue personnalisée pour rafraîchir un token JWT"""

    def post(self, request: Request, *args, **kwargs) -> Response:
        """
        Surcharge de la méthode post pour récupérer le refresh token depuis les cookies
        """
        request._full_data = {"refresh": request.COOKIES.get("refresh")}
        reponse: Response = super().post(request, *args, **kwargs)
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
        serializer.save(utilisateur=self.request.user)

    def get_queryset(self):
        return Transaction.objects.filter(utilisateur=self.request.user)


class ModifierBudgetAPIView(generics.UpdateAPIView):
    """Vue pour modifier le budget d'un utilisateur"""

    permission_classes = [IsAuthenticated]
    serializer_class = BudgetSerializer
    lookup_field = "pk"

    def get_queryset(self):
        return Transaction.objects.filter(utilisateur=self.request.user)
