from django.urls import path

from . import views

urlpatterns = [
    path("register", views.CreationUtilisateurAPIView.as_view(), name="register"),
    path(
        "token-obtain",
        views.VuePersonnaliseeObtenirToken.as_view(),
        name="token-obtain",
    ),
    path(
        "token-refresh",
        views.VuePersonnaliseeRafraichirToken.as_view(),
        name="token-refresh",
    ),
]
