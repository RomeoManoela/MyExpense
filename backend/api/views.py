from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .serializer import UserSerializer


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
