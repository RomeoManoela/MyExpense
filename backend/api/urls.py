from django.urls import path

from . import views

urlpatterns = [
    path("user/", views.InfoUtilisateurAPIView.as_view(), name="user-info"),
    # URLs pour l'authentification
    path("register/", views.CreationUtilisateurAPIView.as_view(), name="register"),
    path(
        "token-obtain/",
        views.PersonnaliseeObtenirTokenAPIView.as_view(),
        name="token-obtain",
    ),
    path(
        "token-refresh/",
        views.PersonnaliseeRafraichirTokenAPIView.as_view(),
        name="token-refresh",
    ),
    # URLs pour les transactions
    path(
        "transactions/",
        views.AjouterListerTransactionAPIView.as_view(),
        name="transactions-list-create",
    ),
    path(
        "transactions/<int:pk>/",
        views.RetrouverTransactionsAPIView.as_view(),
        name="transaction-detail",
    ),
    # URLs pour les budgets
    path(
        "budgets/",
        views.AjouterListerBudgetAPIView.as_view(),
        name="budgets-list-create",
    ),
    path(
        "budgets/<int:pk>/",
        views.ModifierBudgetAPIView.as_view(),
        name="budget-update",
    ),
    path("logout/", views.DeconnectionAPIView.as_view(), name="logout"),
]
