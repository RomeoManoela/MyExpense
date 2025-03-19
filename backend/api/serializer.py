from rest_framework import serializers

from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password", "email"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        fields = "__all__"
        extra_kwargs = {"utilisateur": {"read_only": True}}

    def create(self, validated_data):
        budget = Budget.objects.create(**validated_data)
        return budget


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = "__all__"
        extra_kwargs = {"utilisateur": {"read_only": True}}

    def create(self, validated_data):
        transaction = Transaction.objects.create(**validated_data)
        return transaction
