const path = require('path'); //Module pour travailler avec les chemins de fichiers
const api = require('./api.js'); //Importe les définitions de l'API
const privateMessagesRouter = require('./routes/privateMessages'); //Importe le routeur pour les messages privés
const cors = require('cors'); //Middleware pour activer CORS (Cross-Origin Resource Sharing)


//Détermine le répertoire de base
const basedir = path.normalize(path.dirname(__dirname));
console.debug(`Base directory: ${basedir}`); //Affiche le répertoire de base

express = require('express'); //Importe Express
const app = express() //Crée une instance d'Express
const session = require("express-session"); //Middleware pour les sessions

const MongoClient = require('mongodb').MongoClient; //Client MongoDB pour interagir avec la base de données

//URL pour se connecter à la base de données MongoDB
const dbUrl = "mongodb+srv://sid:sid@cluster0.gunaxvp.mongodb.net/AssosDataBase"
const db = MongoClient.connect(dbUrl); //Connecte à la base de données

//Configuration CORS pour accepter les requêtes de l'origine spécifiée
app.use(cors({
    origin: "http://localhost:5173", //Spécifie l'origine qui peut accéder à l'API

    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", //Méthodes HTTP autorisées
    credentials: true //Autorise les cookies de session à travers les domaines
}));

//Configuration des sessions
app.use(session({
    secret: "technoweb rocks", //Secret utilisé pour signer l'ID de session
    resave: false, //Ne pas sauvegarder la session si elle n'a pas changé
    saveUninitialized: false, //Ne pas créer de session jusqu'à ce qu'elle soit modifiée
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, //Durée de vie du cookie (une semaine ici)
        secure: false, //True si vous êtes en HTTPS
        httpOnly: false, } //Si true, empêche l'accès au cookie via JavaScript côté client
}));

app.use('/api', api.default(dbUrl)); //Utilise l'API pour les chemins commençant par '/api'

//Ajout de la gestion des messages privés
app.use('api', privateMessagesRouter); // Route pour les messages privés

//Fermer la connexion à la base de données ?
app.on('close', () => {
    console.log('Fermeture du serveur, nettoyage en cours...');
});
exports.default = app;

//Le fichier app.js est utilisé pour configurer l'application serveur.
