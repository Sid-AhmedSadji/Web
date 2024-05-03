
# Web Forum App

<!-- English Version -->
# English Version

This application is a web forum where users can create topics and respond to them. Users have limited access to the site and cannot access messages until they have been authorized by an admin.

## Technologies Used & API Calls

### Technologies Used

 **Node.js**: JavaScript runtime environment
 **Express.js**: Web framework for Node.js
 **React.js**: JavaScript library for building user interfaces
 **MongoDB**: NoSQL database
 **Express Session**: Middleware for session management in Express.js
 **WebSocket** : Used to live chat

These technologies are used specifically for handling database queries.

Additionally, some elements of the frontend are sourced from open-source projects.

### API Calls

All requests to the database from the frontend are handled through the `apiCalls.js` file. This file contains methods for interacting with the server's API endpoints, including user authentication, message posting, user management, and more.

Here's a summary of the main functionalities provided by `apiCalls.js`:

 **Authentication**:
  - `login(props)`: Logs in the user.
  - `logout()`: Logs out the user.
  - `checkSession()`: Checks the user's session status.

 **User Management**:
  - `postUser(props)`: Registers a new user.
  - `changeTypeUser(props)`: Changes the type of a user.
  - `getUser(props)`: Retrieves user information.

 **Message Posting**:
  - `postMessage(props)`: Posts a new message.
  - `getMessages(props)`: Retrieves messages.
  - `deleteMessage(id)`: Deletes a message.
  - `reportMessage(id, userId)`: Add userId to reports Array 

## Configuration

1. **Install Dependencies**: Before starting the application, make sure to install all dependencies by running the following command in both the `FRONT` and `server` directories:
   ```
   npm install
   ```

2. **Start the Server**: Launch the server by running the following command from the `server` directory:
   ```
   npm start
   ```

3. **Start the Frontend Application**: To start the frontend application, navigate to the `FRONT` directory and run the following command:
   ```
   npm run dev 
   ```

4. **Open Your Browser**: After starting the server and frontend application, open your web browser and go to `localhost:5173`.

5. **Default Admin User**: By default, the application comes with an admin user with the following credentials:
- Username: admin
- Password: admin

## User Types

There are different types of users in the system:

- **Type 0 (Pending)**: Users who have registered but their account has not been validated yet.
- **Type Banned**: Users who have the same rights as Type 0 users but have been rejected by an admin.
- **Type User**: Users who have been authorized by an admin. They have access to other users' profiles and to the public forum.
- **Type Admin**: Admin users who can grant or revoke permissions from other users, access both public and private forums.

These user types are used to manage access and permissions within the application.

## Pages

- **/**: The main page where users can log in or view topics.
- **/SignUp**: Page for new users to create an account. 
- **/Profil/:pseudo**: User profile page, where :pseudo represents the username of a user, accessible by clicking on a user's username. 
- **/Messages/:id**: Page to view and respond to messages within a topic. Where :id represents the id of a topic, accessible by clicking on a TOPIC. 
- **/Request**: This page is only accessible to admins. Here, admins can view all users who have registered and are awaiting validation to access the messages.
- **/gestionUsers**: Page for admin users to manage other users. Here, admins can change the permissions of other users.

## API Routes

The application exposes the following API routes:

- `GET /api/messages`: Retrieves the list of messages.
- `POST /api/message`: Creates a new message.
- `DELETE /api/message/:id`: Deletes a message by its ID.
- `PUT /report`: Add an UserId to reports Array.
- `GET /api/session`: Checks the user's session status.
- `POST /api/user/login`: Logs in the user.
- `GET /api/user/logout`: Logs out the user.
- `GET /api/users`: Retrieves the list of users.
- `POST /api/user`: Creates a new user.
- `POST /api/changeType`: Changes the user's type.

POST requests require a JSON body containing the required data.

## Additional Features

- **Live Chat Using WebSocket**: Implemented live chat functionality using WebSocket technology, allowing real-time communication between users.
- **Unique Profile Pictures**: Each user has a unique profile picture associated with their account, enhancing personalization and identification on the platform.
- **Ability to Report Messages**: Users can report inappropriate messages, providing a mechanism to maintain community standards and ensure a positive user experience.
- **Encrypted Passwords**: Passwords are encrypted to enhance security and protect user accounts from unauthorized access.
- **Historical of Global Chat (Under Development)**: A feature to view the historical chat messages of the global chat is currently under development. This feature will allow users to access past conversations, enhancing the overall chat experience and providing context for ongoing discussions.



## Authors

This project was created by Sadji Sid-Ahmed and Lim Oudam-dara as part of a university project.



...

---




<!-- French Version -->
# Version en Français



# Application de Forum Web

Cette application est un forum web où les utilisateurs peuvent créer des sujets et y répondre. Les utilisateurs ont un accès limité au site et ne peuvent pas accéder aux messages tant qu'ils n'ont pas été autorisés par un administrateur.

## Technologies Utilisées & Appels API

### Technologies Utilisées

- **Node.js** : Environnement d'exécution JavaScript
- **Express.js** : Cadre web pour Node.js
- **React.js** : Bibliothèque JavaScript pour la création d'interfaces utilisateur
- **MongoDB** : Base de données NoSQL
- **Express Session** : Middleware pour la gestion des sessions dans Express.js
- **WebSocket** : Utilisé pour le chat en direct

Ces technologies sont spécifiquement utilisées pour gérer les requêtes à la base de données.

De plus, certains éléments du frontend proviennent de projets open source.

### Appels API

Toutes les requêtes à la base de données depuis le frontend sont gérées via le fichier `apiCalls.js`. Ce fichier contient des méthodes pour interagir avec les points d'API du serveur, y compris l'authentification utilisateur, la publication de messages, la gestion des utilisateurs, et plus encore.

Voici un résumé des principales fonctionnalités fournies par `apiCalls.js` :

**Authentification** :
  - `login(props)` : Connecte l'utilisateur.
  - `logout()` : Déconnecte l'utilisateur.
  - `checkSession()` : Vérifie l'état de la session de l'utilisateur.

**Gestion des Utilisateurs** :
  - `postUser(props)` : Enregistre un nouvel utilisateur.
  - `changeTypeUser(props)` : Modifie le type d'un utilisateur.
  - `getUser(props)` : Récupère les informations de l'utilisateur.

**Publication de Messages** :
  - `postMessage(props)` : Publie un nouveau message.
  - `getMessages(props)` : Récupère les messages.
  - `deleteMessage(id)` : Supprime un message.
  - `reportMessage(id, userId)` : Ajoute userId au tableau reports.

## Configuration

1. **Installer les Dépendances** : Avant de démarrer l'application, assurez-vous d'installer toutes les dépendances en exécutant la commande suivante dans les répertoires `FRONT` et `server` :
   ```
   npm install
   ```

2. **Démarrer le Serveur** : Lancez le serveur en exécutant la commande suivante depuis le répertoire `server` :
   ```
   npm start
   ```

3. **Démarrer l'Application Frontend** : Pour démarrer l'application frontend, accédez au répertoire `FRONT` et exécutez la commande suivante :
   ```
   npm run dev 
   ```

4. **Ouvrir Votre Navigateur** : Après avoir démarré le serveur et l'application frontend, ouvrez votre navigateur web et accédez à `localhost:5173`.

5. **Utilisateur Admin par Défaut** : Par défaut, l'application est livrée avec un utilisateur admin avec les identifiants suivants :
   - Nom d'utilisateur : admin
   - Mot de passe : admin

## Types d'Utilisateurs

Il existe différents types d'utilisateurs dans le système :

- **Type 0 (En Attente)** : Utilisateurs qui se sont enregistrés mais dont le compte n'a pas encore été validé.
- **Type Banni** : Utilisateurs qui ont les mêmes droits que les utilisateurs de type 0 mais qui ont été rejetés par un administrateur.
- **Type Utilisateur** : Utilisateurs qui ont été autorisés par un administrateur. Ils ont accès aux profils des autres utilisateurs et au forum public.
- **Type Admin** : Utilisateurs administrateurs qui peuvent accorder ou révoquer des autorisations aux autres utilisateurs, accéder aux forums publics et privés.

Ces types d'utilisateurs sont utilisés pour gérer l'accès et les permissions au sein de l'application.

## Pages

- **/** : Page principale où les utilisateurs peuvent se connecter ou consulter les sujets.
- **/SignUp** : Page pour les nouveaux utilisateurs pour créer un compte.
- **/Profil/:pseudo** : Page de profil utilisateur, où :pseudo représente le nom d'utilisateur d'un utilisateur, accessible en cliquant sur le nom d'utilisateur d'un utilisateur.
- **/Messages/:id** : Page pour voir et répondre aux messages dans un sujet. Où :id représente l'identifiant d'un sujet, accessible en cliquant sur un SUJET.
- **/Request** : Cette page est uniquement accessible aux administrateurs. Ici, les administrateurs peuvent voir tous les utilisateurs qui se sont enregistrés et attendent une validation pour accéder aux messages.
- **/gestionUsers** : Page pour les utilisateurs administr

ateurs pour gérer les autres utilisateurs. Ici, les administrateurs peuvent changer les permissions des autres utilisateurs.

## Routes API

L'application expose les routes API suivantes :

- `GET /api/messages` : Récupère la liste des messages.
- `POST /api/message` : Crée un nouveau message.
- `DELETE /api/message/:id` : Supprime un message par son ID.
- `PUT /report` : Ajoute un UserId au tableau reports.
- `GET /api/session` : Vérifie l'état de la session de l'utilisateur.
- `POST /api/user/login` : Connecte l'utilisateur.
- `GET /api/user/logout` : Déconnecte l'utilisateur.
- `GET /api/users` : Récupère la liste des utilisateurs.
- `POST /api/user` : Crée un nouvel utilisateur.
- `POST /api/changeType` : Modifie le type de l'utilisateur.

Les requêtes POST nécessitent un corps JSON contenant les données requises.

## Fonctionnalités Additionnelles

- **Chat en Direct Utilisant WebSocket** : Mise en place d'une fonctionnalité de chat en direct en utilisant la technologie WebSocket, permettant une communication en temps réel entre les utilisateurs.
- **Images de Profil Uniques** : Chaque utilisateur a une image de profil unique associée à son compte, améliorant la personnalisation et l'identification sur la plateforme.
- **Possibilité de Signaler des Messages** : Les utilisateurs peuvent signaler des messages inappropriés, fournissant un mécanisme pour maintenir les normes de la communauté et garantir une expérience utilisateur positive.
- **Mots de Passe Chiffrés** : Les mots de passe sont chiffrés pour renforcer la sécurité et protéger les comptes des utilisateurs contre l'accès non autorisé.
- **Historique du Chat Global (En Cours de Développement)** : Une fonctionnalité pour consulter l'historique des messages du chat global est actuellement en développement. Cette fonctionnalité permettra aux utilisateurs d'accéder aux conversations passées, améliorant l'expérience globale du chat et fournissant un contexte pour les discussions en cours.

## Auteurs

Ce projet a été créé par Sadji Sid-Ahmed et Lim Oudam-dara dans le cadre d'un projet universitaire.