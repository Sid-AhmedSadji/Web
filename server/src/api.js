//App.js
    
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

const express = require("express");
const Users = require("./entities/users.js");
const MongoClient = require("mongodb").MongoClient;

function init(db) {
    const router = express.Router();
    // On utilise JSON
    router.use(express.json());
    // simple logger for this router's requests
    // all requests to this router will first hit this middleware
    router.use((req, res, next) => {
        console.log('API: method %s, path %s', req.method, req.path);
        console.log('Body', req.body);
        next();
    });
    const users = new Users.default(db);
    
    router.get("messages/:id", (req, res) => {
        try {
            const id = req.params.id;
            const message = listeMessages.find(message => message.id === id || message.id_Parent === id);
            if (message) 
                res.status(200).send({message: "Message found", messages : message });
            else
                res.sendStatus(404);
        }catch(e){
            res.status(500).send({message: "Internal server error", error : e });
        }
    });

    router.post("/acceptUser", (req, res) => {
        try {
            const { id,type } = req.body;
            const user = users.find(u => u.id === id);
            if (user) {
                if (user.type > type) {
                    res.status(401).json({ message: 'User type cannot be decreased' });
                }
                user.type = type;
                res.status(200).json({ message: 'User type changed' });
            }else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
            
        }catch(e){
            res.status(500).send({message: "Internal server error", error : e });
    }})

    router.get("/messages", (req, res) => {
        try {
            res.status(200).send(listeMessages);

        }catch(e){
            res.status(500).send({message: "Internal server error", error : e });
        }
    });

    router.put("/newMessage", (req, res) => {
        try {
            if (!req.session.userid) {
                res.status(401).json({
                    message: "User not logged in"
                });
                return;
            }
            if (!req.body.author_name || !req.body.author_id || !req.body.text || !req.body.id_Parent) {
                res.status(400).json({
                    message: "Requête invalide : author_name, author_id, text et id_Parent requis"
                });
                return;
            }
            const { author_name, author_id, text, id_Parent } = req.body;
            const id = messages.length + 1;
            const message = { author_name, author_id, text, id, id_Parent };
            listeMessages.push(message);
            res.status(201).json({ message: "Message created", message });
        }catch(e){
            res.status(500).send({message: "Internal server error", error : e });
        }
    });

    router.get("/session", (req, res) => {
        try{
            if (req.session.userid) {
                res.status(200).json({
                    message: "User logged in",
                    userid: req.session.userid
                });
            }
            else {
                res.status(401).json({
                    message: "User not logged in"
                });
            }
        }catch(e){
            res.status(500).send({message: "Internal server error", error : e });
        }
    });

    router.post("/user/login", async (req, res) => {
        try {
            const { login, password } = req.body;
            // Erreur sur la requête HTTP
            if (!login || !password) {
            	res.status(400).json({
                    status: 400,
                    "message": "Requête invalide : login et password nécessaires"
                }); 
                return;
            }
            if(! await users.exists(login)) {
            	res.status(401).json({
                    status: 401,
                    message: "Utilisateur inconnu"
                });
                return;
            }
            let userid = await users.checkpassword(login, password);
            if (userid) {
                // Avec middleware express-session
                req.session.regenerate(function (err) {
                    if (err) {
                        res.status(500).json({
                            status: 500,
                            message: "Erreur interne"
                        });
                    }
                    else {
                        // C'est bon, nouvelle session créée
                        req.session.userid = userid;
                        res.status(200).json({
                            status: 200,
                            message: "Login et mot de passe accepté"
                        });
                    }
                });
                return;
            }
            // Faux login : destruction de la session et erreur
            req.session.destroy((err) => { });
            res.status(403).json({
                status: 403,
                message: "login et/ou le mot de passe invalide(s)"
            });
            return;
        }
        catch (e) {
            // Toute autre erreur
            res.status(500).json({
                status: 500,
                message: "erreur interne",
                details: (e || "Erreur inconnue").toString()
            });
        }
    });

    //logout 
    router.get("/user/logout", (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                res.status(500).json({
                    message: "Erreur interne"
                });
            }
            else {
                res.status(200).json({
                    message: "Logout reussi"
                });
            }
        });
    })

    router.get("users", (req, res) => {
        try {
            res.status(200).send({message: "Users found", users : users.getAll() });
        }catch (e) {
            res.status(500).send({message: "Internal server error", error : e });
        }
    });

    router.get("/user/pseudo/:pseudo", (req, res) => {
        try {
            const user = users.getByPseudo(req.params.pseudo);
            if (!user)
                res.sendStatus(404);
            else
                res.status(200).send(user);
        }
        catch (e) {
            res.status(500).send(e);
        }
    });

    router
        .route("/user/:user_id")
        .get(async (req, res) => {
        try {
            const user = await users.get(req.params.user_id);
            if (!user)
                res.sendStatus(404);
            else
                res.status(200).send(user);
        }
        catch (e) {
            res.status(500).send(e);
        }
    })
        .delete((req, res, next) => res.send(`delete user ${req.params.user_id}`));

    router.put("/user", (req, res) => {
        const { login, password, lastname, firstname } = req.body;
        if (!login || !password || !lastname || !firstname) {
            res.status(400).send("Missing fields");
        } else {
            users.create(login, password, lastname, firstname)
                .then((user_id) => res.status(201).send({ id: user_id }))
                .catch((err) => res.status(500).send(err));
        }
    });

    

    return router;
}
exports.default = init;

