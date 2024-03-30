# Application de gestion d'utilisateurs et de messages

Cette application est un système de gestion des utilisateurs et des messages. Elle permet de créer, de modifier et de supprimer des utilisateurs, ainsi que d'envoyer, de modifier et de supprimer des messages.

## Technologies utilisées

- **Node.js** : Plateforme JavaScript côté serveur
- **Express.js** : Framework web pour Node.js
- **React.js** : Bibliothèque JavaScript pour construire des interfaces utilisateur
- **MongoDB** : Base de données NoSQL
- **Session Express** : Middleware de gestion des sessions pour Express.js

## Configuration

1. **Installation des dépendances** : Avant de démarrer l'application, assurez-vous d'installer toutes les dépendances en exécutant la commande suivante dans les répertoire Front et serveur :
   ```
   npm install
   ```

2. **Configuration de la base de données** : Assurez-vous d'avoir une instance MongoDB exécutée localement ou configurez les informations de connexion à une base de données distante dans le fichier `config.js`.

3. **Démarrage du serveur** : Lancez le serveur en exécutant la commande suivante :
   ```
   npm start
   ```

4. **Démarrage de l'application frontend** : Pour démarrer l'application frontend, accédez au répertoire `frontend` et exécutez la commande suivante :
   ```
   npm run dev 
   ```

## Utilisation

1. **Connexion** : Lorsque vous accédez à l'application, vous serez invité à vous connecter. Utilisez vos identifiants utilisateur pour vous connecter.

2. **Gestion des utilisateurs** : Une fois connecté, vous pouvez accéder à la gestion des utilisateurs. Vous pouvez ajouter, supprimer et modifier des utilisateurs.

3. **Gestion des messages** : Vous pouvez également accéder à la gestion des messages. Ici, vous pouvez envoyer de nouveaux messages, modifier et supprimer les messages existants.

## Routes API

L'application expose les routes API suivantes :

- `GET /api/users` : Récupère la liste des utilisateurs.
- `GET /api/users/:id` : Récupère un utilisateur par son ID.
- `POST /api/users` : Crée un nouvel utilisateur.
- `PUT /api/users/:id` : Met à jour un utilisateur existant.
- `DELETE /api/users/:id` : Supprime un utilisateur par son ID.

- `GET /api/messages` : Récupère la liste des messages.
- `GET /api/messages/:id` : Récupère un message par son ID.
- `POST /api/messages` : Crée un nouveau message.
- `PUT /api/messages/:id` : Met à jour un message existant.
- `DELETE /api/messages/:id` : Supprime un message par son ID.

##Ce qui reste a faire : 
- ** Fonction pour ajouter des messages API + FRONT **
- ** Fonction pour faire des reponses **
- ** Ajout d'un forum privé **
- ** Retiré les options d'acces au user en attente et acces au forums privé pour les non admin **
- ** Ajout a l'info panel le nombre d'utilisateur et de topic **
-     ** regler le probleme d'acces aux p  


## Auteurs

Ce projet a été réalisé par Sadji Sid-Ahmed et Lim [Ajouter son nom].

