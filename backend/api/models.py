from django.contrib.auth.models import User
from django.db import models


class Budget(models.Model):
    """Models pour le budget"""

    utilisateur = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="budget"
    )
    montant_max = models.DecimalField(max_digits=10, decimal_places=2)
    montant_actuel = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if self.montant_actuel is None:
            self.montant_actuel = self.montant_max
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.montant_max} - {self.montant_actuel} - {self.date}"


class Transaction(models.Model):
    """Models pour les transactions"""

    CHOIX_CATEGORIE = (
        ("transport", "Transport"),
        ("nourriture", "Nourriture"),
        ("logement", "Logement"),
        ("santé", "Santé"),
        ("éducation", "Éducation"),
        ("loisirs", "Loisirs"),
        ("vêtements", "Vêtements"),
        ("services", "Services"),
        ("autres", "Autres"),
        ("salaires", "Salaires"),
    )
    utilisateur = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="transaction"
    )
    montant = models.DecimalField(max_digits=10, decimal_places=2)
    type = models.CharField(
        max_length=100, choices=(("dépense", "Dépense"), ("revenu", "Revenu"))
    )
    categorie = models.CharField(max_length=100, choices=CHOIX_CATEGORIE)
    date = models.DateField(auto_now_add=True)
    description = models.TextField(blank=True, null=True)

    def save(self, *args, **kwargs):
        if self.type == "revenu":
            self.categorie = "salaires"
            self.utilisateur.budget.montant_actuel += self.montant
            self.utilisateur.budget.save()
        elif self.type == "dépense":
            self.utilisateur.budget.montant_actuel -= self.montant
            self.utilisateur.budget.save()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.montant} - {self.date} - {self.type}"
