# r-ExpenseTracker

Une application web de suivi des dépenses personnelles, permettant aux utilisateurs de gérer leurs finances
efficacement.

## Fonctionnalités

- Authentification et gestion des utilisateurs par JWT
- Enregistrement des dépenses et revenus
- Visualisation des dépenses par catégorie
- Rapports détaillés et graphiques
- Planification budgétaire

## Technologies utilisées

### Frontend

- React 19
- TypeScript
- Redux Toolkit
- React Router v7
- Chart.js
- Tailwind CSS
- Vite

### Backend

- Django
- Django REST Framework
- JWT Authentication

## Installation

### Prérequis

- Node.js (v18+)
- Python (v3.10+)
- npm ou yarn

### Configuration du frontend

```bash
# Cloner le dépôt
git clone https://github.com/RomeoManoela/MyExpense.git
cd MyExpense

# Installer les dépendances frontend
cd frontend
npm install

# Lancer le serveur de développement
npm run dev
```

### Configuration du backend

```bash
# Créer un environnement virtuel
cd backend
python -m venv .venv
source .venv/bin/activate  # Sur Windows: .venv\Scripts\activate

# Installer les dépendances
pip install -r requirements.txt # ou pip3 install -r requirements.txt
```

Créer un fichier .env et y mettre les variables d'environnement:

```bash
POSTGRES_DB=r_expense
POSTGRES_USER=vous
POSTGRES_PASSWORD=vous
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
```

``` bash
# Appliquer les migrations

python manage.py migrate

# Lancer le serveur

python manage.py runserver 8001

```

## Captures d'écran

![Dashboard](dashboard.png)
*Dashboard principal avec graphiques et historique des transactions*

## Auteur

Créé par Roméo Manoela