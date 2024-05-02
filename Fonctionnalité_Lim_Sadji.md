- **Binôme :**
Lim Oudam-dara
Sadji Sid-Amhed

# Fonctionnalités

## Partie : Front-end

### Fonctionnalités du cahier des charges et développées

**Affichage et gestion des messages** :
   - *Affichage de messages individuels avec troncature du texte et suppression disponible pour les administrateurs.*
   - *Gestion de l'affichage récursif des messages et de leurs réponses avec un lien pour afficher plus de réponses.*
   - *Affichage d'un résumé des messages sur les profils utilisateurs, avec redirection vers des vues détaillées.*

**Gestion des utilisateurs** :
   - *Connexion et déconnexion des utilisateurs avec vérification de session et gestion d'état de connexion.*
   - *Inscription des nouveaux utilisateurs avec validation avancée des champs, incluant la sécurité des mots de passe.*
   - *Gestion des profils utilisateurs, permettant de voir et d'éditer des informations personnelles et de naviguer entre différentes vues (profil, messages).*

**Navigation et routage** :
   - *Utilisation de React Router pour la navigation entre différentes pages et composants (par exemple, page d'accueil, profil, inscription).*
   - *Routes conditionnelles basées sur le statut de l'utilisateur (redirections basées sur si l'utilisateur est connecté ou non).*

**Administration et modération** :
   - *Interface de gestion pour les administrateurs pour gérer les demandes des utilisateurs (par exemple, approbations de compte, gestion des types d'utilisateur).*
   - *Fonctionnalités de suppression et de gestion des messages accessibles uniquement aux administrateurs.*

**Interface utilisateur et composants réutilisables** :
   - *Composants d'en-tête pour la navigation et l'affichage conditionnel d'options basées sur le type d'utilisateur.*
   - *Composants pour la saisie de recherche et le filtrage des messages ou contenus.*
   - *Design stylisé et responsive pour différents composants (boutons, champs de saisie, etc.).*

## Partie : Back-end

### Fonctionnalités du cahier des charges et développées

#### Gestion des utilisateurs

**Authentification** :
   - *Connexion sécurisée avec vérification des identifiants et mot de passe.*
   - *Déconnexion qui détruit la session de l'utilisateur pour éviter les utilisations non autorisées.*
   - *Gestion des sessions avec express-session pour maintenir l'état de connexion à travers les requêtes HTTP.*

**Gestion des comptes** :
   - *Création de nouveaux utilisateurs avec vérification de l'existence préalable pour éviter les doublons.*
   - *Suppression de comptes utilisateurs à travers des requêtes spécifiques.*
   - *Récupération des données utilisateurs, permettant des recherches par ID, login, ou type d'utilisateur.*

### Gestion des messages

**CRUD sur les messages** :
   - *Création de messages avec gestion des détails tels que l'ID parent pour les réponses, la confidentialité, et l'auteur.*
   - *Lecture des messages avec possibilité de filtrage par ID et niveau de confidentialité.*
   - *Suppression de messages par ID, permettant une modération effective des contenus.*

**Gestion des droits et des sessions** :
   - *Certaines actions, comme la création ou suppression de messages, requièrent que l'utilisateur soit authentifié, ce qui est contrôlé par la session.*
   - *Mise à jour du type d'utilisateur, permettant des ajustements administratifs sur le rôle des utilisateurs.*

### Sécurité et intégration

**CORS et sécurité** :
   - *Configuration de CORS pour permettre les interactions sécurisées entre différentes origines, essentiel pour les applications avec front-end et back-end séparés.*
   - *Utilisation de sessions pour sécuriser et personnaliser l'expérience utilisateur.*

**MongoDB pour la persistance des données** :
   - *Utilisation de MongoDB pour stocker et récupérer toutes les données utilisateur et de messages. Les opérations sur la base de données sont réalisées via le client MongoDB et gérées à travers des modèles spécifiques (Users, Messages).*

### Routes et Middleware

**Middleware pour la gestion des requêtes** : 
- *Utilisation de middleware pour logger les requêtes, gérer les erreurs, et parse les corps des requêtes JSON.*
**Routes spécifiques** :
- *Pour la gestion des messages privés, des utilisateurs, des sessions, et des interactions liées aux messages.*

## Fonctionnalités potentielle non développées ou en cours

**Notification** :
   - *Implémentation de notifications pour les interactions en temps réel ou les mises à jour importantes.*

**Interactions en temps réel** :
   - *Un système de chat global utilisant WebSockets pour permettre aux utilisateurs de communiquer en temps réel.*
   - *Historique du système de chat global*