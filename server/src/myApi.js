const express = require('express');
const bodyParser = require('body-parser');
//const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
const app = express();
const port = 8000;

//app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
app.use(bodyParser.json());
// Configuration de express-session
app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 3 // 3 heures
    }
}));




const users = [
    {
        "pseudo": "JohnDoe123",
        "password": "password1",
        "type": 2,
        "id": "0"
    },
    {
        "pseudo": "JaneDoe456",
        "password": "password2",
        "type": 1,
        "id": "1"
    },
    {
        "pseudo": "Alice789",
        "password": "password3",
        "type": 0,
        "id": "2"
    },
    {
        "pseudo": "Bob1234",
        "password": "password4",
        "type": 2,
        "id": "3"
    },
    {
        "pseudo": "Eve5678",
        "password": "password5",
        "type": 1,
        "id": "4"
    },
    {
        "pseudo": "Charlie9012",
        "password": "password6",
        "type": 0,
        "id": "5"
    },
    {
        "pseudo": "David3456",
        "password": "password7",
        "type": 2,
        "id": "6"
    },
    {
        "pseudo": "Emily7890",
        "password": "password8",
        "type": 1,
        "id": "7"
    },
    {
        "pseudo": "Frank2345",
        "password": "password9",
        "type": 0,
        "id": "8"
    },
    {
        "pseudo": "Grace5678",
        "password": "password10",
        "type": 2,
        "id": "9"
    },
    {
        "pseudo": "Dido",
        "password": "12345",
        "type": 2,
        "id": "10"
    }
];
    
 const listeMessages = [
    {
        "author_name": "JohnDoe123",
        "author_id": "0",
        "text": "Salut tout le monde !",
        "id": "msg0",
        "id_Parent": "0"
    },
    {
        "author_name": "JaneDoe456",
        "author_id": "1",
        "text": "Bonjour ! Comment ça va ?",
        "id": "msg1",
        "id_Parent": "msg0"
    },
    {
        "author_name": "Alice789",
        "author_id": "2",
        "text": "Coucou les amis !",
        "id": "msg2",
        "id_Parent": "msg0"
    },
    {
        "author_name": "Bob1234",
        "author_id": "3",
        "text": "Salutations !",
        "id": "msg3",
        "id_Parent": "msg2"
    },
    {
        "author_name": "Eve5678",
        "author_id": "4",
        "text": "Hello world!",
        "id": "msg4",
        "id_Parent": "0"
    },
    {
        "author_name": "Charlie9012",
        "author_id": "5",
        "text": "Bonjour tout le monde !",
        "id": "msg5",
        "id_Parent": "0"
    },
    {
        "author_name": "David3456",
        "author_id": "6",
        "text": "Salut les amis !",
        "id": "msg6",
        "id_Parent": "msg5"
    },
    {
        "author_name": "Emily7890",
        "author_id": "7",
        "text": "Coucou !",
        "id": "msg7",
        "id_Parent": "msg5"
    },
    {
        "author_name": "Frank2345",
        "author_id": "8",
        "text": "Salutations à tous !",
        "id": "msg8",
        "id_Parent": "0"
    },
    {
        "author_name": "Grace5678",
        "author_id": "9",
        "text": "Bonjour tout le monde !",
        "id": "msg9",
        "id_Parent": "msg8"
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
    users.push({ pseudo, password, type: 0, id: users.length.toString() });

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
/*
//set user cookie
app.get('/setUserCookie/:id', (req, res) => {
    // Rechercher l'utilisateur correspondant à l'ID dans la liste des utilisateurs
    const user = users.find(user => user.id === req.params.id);

    if (user) {

        
      // Créer un cookie nommé 'user' avec les données de l'utilisateur
      res.cookie('user', user, { maxAge: 900000 });

      // Ajouter les en-têtes CORS pour autoriser les requêtes depuis le frontend


      res.send({ msg: 'Cookie has been set', ok: true });
    } else {
      // Si aucun utilisateur n'est trouvé pour l'ID spécifié, renvoyer une réponse avec un message d'erreur
      res.send({ msg: 'User not found',status:404 , ok: false });
    }
  });

app.get('/checkUserCookie', (req, res) => {
    const userCookie = req.cookies.user;

    if (userCookie) {
        const user = users.find(u => u.id === userCookie.id && u.password === userCookie.password && u.pseudo === userCookie.pseudo && u.type === userCookie.type);
        if (user) {
            res.status(200).send({ authenticated: true, user });
        } else {
            res.status(401).send({ authenticated: false, message: 'Invalid user cookie' });
        }
    } else {
        res.status(401).send({ authenticated: false, message: 'No user cookie found' });
    }
});

app.use(function (req, res, next) {
    res.json({message:"Cette page n'existe pas.",status:404 , ok: false});
});
  
*/
//get user cookie
// Route de connexion pour vérifier les informations de connexion et définir l'état de la session
app.post('/api/login', (req, res) => {
    const { pseudo, password } = req.body;
    const user = users.find(u => u.pseudo === pseudo && u.password === password);
    if (user) {
        // Définit l'utilisateur dans la session
        req.session.user = user;
        console.log(users);
        res.json({ message: 'User logged in', ok:true });
    } else {
        res.json({ message: 'Invalid credentials', status:401, ok:false });
    }
});

//change le type d'utilisateur 
app.post('/api/changeType', (req, res) => {
    const { id,type } = req.body;
    console.log(id,type);
    const user = users.find(u => u.id === id);
    
    if (user) {
        if (user.type > type) {
            res.json({ message: 'User type cannot be decreased', status:401, ok:false });
        }
        user.type = type;
        console.log(users);
        res.json({ message: 'User type changed', ok:true });
    }else {
        res.json({ message: 'Invalid credentials', status:401, ok:false });
    }
}
)

// Route pour vérifier l'état de la session utilisateur
app.get('/api/session', (req, res) => {
    if (req.session.user) {
        res.send({ user: req.session.user , ok: true});
    } else {
        res.send({ message: 'No user logged in' , status : 401, ok: false});
    }
});

//route par defaut
app.use ((req, res) => {
    res.json({message:"Cette page n'existe pas.",status:404 , ok: false});
})

app.listen(port, function() {
    console.log(`Le serveur écoute le port ${port}`);
});