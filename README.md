# Projet : Réseau Social GraphQL

## Description
Ce projet consiste à développer un réseau social permettant aux utilisateurs de s'inscrire, publier des articles, commenter les publications d'autres utilisateurs et "liker" des articles. Il est divisé en deux parties : le backend en Apollo Server avec Prisma et le frontend en utilisant un framework moderne (React).

---

## Technologies Utilisées

### Backend
- **Apollo Server** pour la gestion des requêtes GraphQL
- **Prisma** pour la gestion de la base de données
- **GraphQL Codegen** pour la génération automatique des types et des hooks
- **JWT** pour l'authentification
- **TypeScript** en mode strict

### Frontend
- **React / Vue / Svelte** pour le développement de l'interface utilisateur
- **Apollo Client** pour la gestion de l'état et la communication avec le serveur
- **GraphQL Codegen** pour la génération des types et hooks 

---

## Fonctionnalités

### Authentification
- Inscription et connexion des utilisateurs
- Gestion des sessions utilisateur avec JWT
- Possibilite de deconnecter 

### Gestion des Articles
- Création, lecture, modifier et suppression d'articles
- Affichage des articles avec l'auteur, le contenu, les commentaires et les likes

### Interaction avec les Articles
- Possibilité pour les utilisateurs de commenter les articles
- Système de "like" pour les articles

### Navigation et Filtrage
- Vue d'ensemble des derniers articles sur la page principale
- Filtre des articles par auteur ou popularité (nombre de likes)

---

## Installation et Démarrage

### Prérequis
- Node.js 
- SqlLite
- Yarn ou npm

### Configuration de l'Environnement
Copiez le fichier `.env.example` en `.env` dans le dossier `back` :
```bash
cp back/.env.example back/.env
```

### Démarrage du Projet

#### Avec Docker
```bash
docker compose up --build
```

#### Manuellement

Installez les dépendances dans les deux répertoires (`back` et `frontend`) :
```bash
cd back
npm install
cd ../frontend
npm install
```

Démarrez les deux répertoires en mode développement :
```bash
cd back
npm run dev
cd ../frontend
npm run dev
```

---

## Auteur
Corentin CLERO
Brice KUCA
Fatat TARRAF
DIAG Mohamed


