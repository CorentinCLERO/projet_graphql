# projet_graphql

Pour démarrer le projet, suivez les étapes ci-dessous :

1. Copier le fichier `.env.example` en `.env` dans le dossier `back` :
```sh
cp back/.env.example back/.env
```


2. Pour lancer le projet avec Docker, exécutez la commande suivante :
```sh
docker compose up --build
```

3. Sinon, pour lancer le projet manuellement :

Installez les dépendances dans les deux répertoires (back et frontend) :

```sh
cd back
npm install
cd ../frontend
npm install
```

- Démarrez les deux répertoires en mode développement :
```sh
cd back
npm run dev
cd ../frontend
npm run dev
```