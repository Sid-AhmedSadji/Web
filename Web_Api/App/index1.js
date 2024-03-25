const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 8000;
app.use(bodyParser.json());

app.use(cors());

/* const liste des users */
const users = [
    {
        "nom": "Sadji",
        "prenom": "Sid-Ahmed",
        "pseudo": "Dido",
        "password": "12345",
        "type": 2,
        "id": "0"
    },
    {
        "nom": "sadji",
        "prenom": "sid-ahmed",
        "pseudo": "dido",
        "password": "12345",
        "type": 1,
        "id": "1"
    },
    {
        "nom": "Cest",
        "prenom": "Moi",
        "pseudo": "Wesh",
        "password": "12345",
        "type": 0,
        "id": "2"
    }

]

app.get('/api/user/:id', (req, res) => {
    res.setHeader('Content-Type', 'application/json;charset=UTF-8');
    const id = req.params.id;
    res.end(JSON.stringify(users.filter(message => message.id === id)));
})

app.get('/api/users', (req, res) => {
    res.setHeader('Content-Type', 'application/json;charset=UTF-8');
    res.end(JSON.stringify(users));
});

/*methode pour ajouter un users  la methode prends un fichier en argum */
app.post('/api/user', (req, res) => {

    // Si il n y a pas 5 d argeument return erreur 
    if (Object.keys(req.body).length !== 5) {
        res.sendStatus(400);
    }
    
    // Récupère les données du corps de la requête
    const { nom, prenom, pseudo, password, type } = req.body;


    // Crée un nouvel utilisateur avec les données fournies
    const newUser = { nom, prenom, pseudo, password, type, id: users.length.toString() };

    // Ajoute le nouvel utilisateur à la liste des utilisateurs
    users.push(newUser);

    // Renvoie la réponse avec le nouvel utilisateur ajouté
    res.json(newUser);
});

/*methode pour supprimer un users avec son id */
app.delete('/api/user/:id', (req, res) => {
    const id = req.params.id;
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        users.splice(index, 1);
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
})

// methode get return id d'un user avec son pseudo et son password sinon retourner erreur
app.get('/api/user/:pseudo/:password', (req, res) => {
    const pseudo = req.params.pseudo;
    const password = req.params.password;
    const user = users.find(user => user.pseudo === pseudo && user.password === password);
    if (user) {
        res.json(user.id);
    } else {
        res.sendStatus(404);
    }
})

app.use(function (req, res, next) {
    res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
    res.status(404).send("Cette page n'existe pas.");
});

app.listen(port, function() {
    console.log(`Le serveur écoute le port ${port}`);
});
