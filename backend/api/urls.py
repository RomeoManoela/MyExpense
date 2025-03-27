from django.urls import path

from .views import (
    InfoUtilisateurAPIView,
    CreationUtilisateurAPIView,
    PersonnaliseeObtenirTokenAPIView,
    PersonnaliseeRafraichirTokenAPIView,
    AjouterListerTransactionAPIView,
    RetrouverTransactionsAPIView,
    AjouterListerBudgetAPIView,
    ModifierBudgetAPIView,
    DeconnectionAPIView,
    AnalyticsAPIView,
)

urlpatterns = [
    path("user/", InfoUtilisateurAPIView.as_view(), name="user-info"),
    # URLs pour l'authentification
    path("register/", CreationUtilisateurAPIView.as_view(), name="register"),
    path(
        "token-obtain/",
        PersonnaliseeObtenirTokenAPIView.as_view(),
        name="token-obtain",
    ),
    path(
        "token-refresh/",
        PersonnaliseeRafraichirTokenAPIView.as_view(),
        name="token-refresh",
    ),
    # URLs pour les transactions
    path(
        "transactions/",
        AjouterListerTransactionAPIView.as_view(),
        name="transactions-list-create",
    ),
    path(
        "transactions/<int:pk>/",
        RetrouverTransactionsAPIView.as_view(),
        name="transaction-detail",
    ),
    # URLs pour les budgets
    path(
        "budgets/",
        AjouterListerBudgetAPIView.as_view(),
        name="budgets-list-create",
    ),
    path(
        "budgets/<int:pk>/",
        ModifierBudgetAPIView.as_view(),
        name="budget-update",
    ),
    path("logout/", DeconnectionAPIView.as_view(), name="logout"),
    path("analytics/", AnalyticsAPIView.as_view(), name="analytics"),
]
