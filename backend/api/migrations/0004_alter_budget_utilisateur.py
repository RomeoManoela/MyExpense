# Generated by Django 5.1.7 on 2025-03-18 19:38

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0003_alter_transaction_utilisateur"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name="budget",
            name="utilisateur",
            field=models.OneToOneField(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="budget",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
    ]
