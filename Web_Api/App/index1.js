const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const cors = require('cors');
const app = express();
const port = 8000;
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

/* const liste des users */
const users = [
    {
        "pseudo": "Dido",
        "password": "12345",
        "type": 2,
        "id": "0"
    },
    {
        "pseudo": "dido",
        "password": "12345",
        "type": 1,
        "id": "1"
    },
    {
        "pseudo": "Wesh",
        "password": "12345",
        "type": 0,
        "id": "2"
    },
    {
        "pseudo": "Didi",
        "password": "12345",
        "type": 2,
        "id": "3"
    }

]

const listeMessages = [
    {
        "author_name": "Dido",
        "author_id": "3",
        "text": "New Message",
        "id": "msg0",
        "id_Parent": "0"
    },
    {
        "author_name": "dido",
        "author_id": "0",
        "text": "message1",
        "id": "msg1",
        "id_Parent": "msg0"
    },
    {
        "author_name": "Wesh",
        "author_id": "2",
        "text": "Je saute haut",
        "id": "msg2",
        "id_Parent": "msg0"
    },
    {
        "author_name": "Dido",
        "author_id": "3",
        "text": "Je saute MEGA haut",
        "id": "msg3",
        "id_Parent": "msg2"
    },
    {
        "author_name": "Didi",
        "author_id": "3",
        "text": "Je saute tres haut",
        "id": "msg4",
        "id_Parent": "0"
    },
];

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
    // Si le nombre d'arguments n'est pas égal à 2, renvoyer une erreur 400 (Bad Request)
    if (Object.keys(req.body).length !== 2 || !req.body.pseudo || !req.body.password) {
        return res.sendStatus(400);
    }

    // Si le pseudo est déjà dans la liste, renvoyer une erreur 409 (Conflict)
    if (users.some(user => user.pseudo === req.body.pseudo)) {
        return res.sendStatus(409);
    }

    // Récupère les données du corps de la requête
    const { pseudo, password } = req.body;
    
    // Ajoute le pseudo et le mot de passe à la liste, initialise le type à "0" et l'id à la longueur de la liste
    users.push({ pseudo, password, type: "0", id: users.length.toString() });

    // Renvoie la réponse avec le nouvel utilisateur ajouté et un champ "ok" à true
    res.json({ user: users[users.length - 1], ok: true });
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

// methode get return user avec son pseudo et son password sinon retourner erreur
app.get('/api/user/:pseudo/:password', (req, res) => {
    const pseudo = req.params.pseudo;
    const password = req.params.password;
    const user = users.find(user => user.pseudo === pseudo && user.password === password);
    if (user) {
        res.json(user);
    } else {
        res.sendStatus(404);
    }
})

//methode retourne les messages 
app.get('/api/messages', (req, res) => {
    res.send(JSON.stringify(listeMessages));
})

//methode retourne un message avec son id en les message enfants 
app.get('/api/messages/:id', (req, res) => {
    const id = req.params.id;
    const message = listeMessages.find(message => message.id === id || message.id_Parent === id);
    if (message) {
        res.send(JSON.stringify(message));
    } else {
        res.sendStatus(404);
    }
})

//methode retourne tous les messages d'un users qui  ne sont pas enfants 
app.get('/api/messages/user/:id', (req, res) => {
    const id = req.params.id;
    const messages = listeMessages.filter(message => message.author_id === id && message.id_Parent === "0");
    if (messages) {
        res.send(JSON.stringify(messages));
    } else {
        res.sendStatus(404);
    }
})

//methode pour ajouter un message retourne erreur si parametre manquant
app.post('/api/messages', (req, res) => {

    if (Object.keys(req.body).length !== 3) {
        res.sendStatus(400);
    }
    // verifie qu on a autor_id et text et id_Parent
    const { author_id, text, id_Parent } = req.body;
    if (!author_id || !text || !id_Parent) {
        res.sendStatus(400);
    }
    //recupe auteurid et initialise id message en fonction de la taille de la liste 
    const author = users.find(user => user.id === author_id);
    if (!author) {
        res.sendStatus(404);
    }
    const id = (listeMessages.length + 1).toString();
    //ajoute le message dans la liste
    const newMessage = { author_name: author.pseudo, author_id, text, id, id_Parent };
})

//set user cookie
app.get('/setUserCookie/:id', (req, res) => {
    // Rechercher l'utilisateur correspondant à l'ID dans la liste des utilisateurs
    const user = users.find(user => user.id === req.params.id);
  
    if (user) {
      // Créer un cookie nommé 'user' avec les données de l'utilisateur
      res.cookie('user', user, { maxAge: 900000 });
      res.send({ msg: 'Cookie has been set', ok: true });
    } else {
      // Si aucun utilisateur n'est trouvé pour l'ID spécifié, renvoyer une réponse avec un message d'erreur
      res.status(404).send({ msg: 'User not found', ok: false });
    }
  });
  

//get user cookie
app.get('/readcookie', (req, res) => {
    // Accéder aux cookies de la requête
    const userCookie = req.cookies.user;
  
    // Vérifier si le cookie existe
    if (userCookie) {
      // Cookie trouvé, afficher sa valeur rnvoie la valeur de l'utilisateur dans le cookie et un champ "ok" à true en js 
      res.send({cookieValue: userCookie,ok:true});
    } else {
      // Cookie non trouvé
      res.send({cookieValue: 'No cookie found',ok:false});
    }
  });


app.use(function (req, res, next) {
    res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
    res.status(404).send("Cette page n'existe pas.");
});

app.listen(port, function() {
    console.log(`Le serveur écoute le port ${port}`);
});
