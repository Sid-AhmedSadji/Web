//App.js

const { ObjectId } = require('mongodb');
const express = require("express");
const Users = require("./entities/users.js");
const Messages = require("./entities/messages.js");
const MongoClient = require("mongodb").MongoClient;


function init(dbUrl) {

    const router = express.Router();
    // On utilise JSON
    router.use(express.json());
    // simple logger for this router's requests
    // all requests to this router will first hit this middleware
    router.use((req, res, next) => {
        console.log('API: method %s, path %s', req.method, req.path);
        console.log('Body', req.body);
        console.log('Query', req.query);
        next();
    });
    const users = new Users.default(dbUrl);
    const messages = new Messages.default(dbUrl);

    router.get("/messages",async (req, res) => {

        try {

            // const userid = req.session?.userid;
            // if (!userid) {
            //     res.status(401).json({
            //         message: "User not logged in"
            //     });
            //     return;
            // }
            const { id, privacy } = req.query;
            const newObectId = id ? new ObjectId(id) : null;

            const result = await messages.get(newObectId,privacy);
            if (!result) {
                res.status(404).json({ message: "No messages found" });
                return;
            }
            res.status(200).json({ message: "Messages found", messages: result });
        }catch (e) {
            res.status(500).send({ message: "Internal server error", error: e });
        }
    });


    router.post("/changeType", async (req, res) => {
        try {
            const { id,type } = req.body;
            const user = await users.get(id);
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }

            const reponse = await users.update(id, type);
            if (!reponse) {
                res.status(500).send({ message: "Internal server error" });
                return;
            }
            res.status(200).send({ message: "User updated" });
        }catch(e){
            res.status(500).send({message: "Internal server error", error : e });
    }})

    router.put("/message", async (req, res) => {
        try {

            let { userid,message, id_Parent, title, date, privacy } = req.body;


            // verifie que les paramettres ne sont pas nul et affiche celui qui est nul
            if ( !userid || !message || !id_Parent || !title || !date) {

                res.status(400).json({
                    message: "Missing parameters"
                })
                return;
            }
            const newObjectId = new ObjectId(userid)
            const user = await users.get(newObjectId);
            const author_name = user[0].login;
            if (id_Parent !== "0"){
                id_Parent = new ObjectId(id_Parent)
            }
            if (await messages.exists(title)) {
                res.status(400).json({
                    message: "Title already exists"
                })
                return;
            }
            console.log("message", message,"newObjectId", newObjectId,"date", date,"author_name", author_name,"id_Parent", id_Parent,"title", title,"privacy", privacy)
            const reponse = await messages.create(message, date, author_name, id_Parent, title, privacy);
            console.log(reponse)

            res.status(201).json({ message: "Message created", message: reponse });
        } catch (e) {
            res.status(500).send({ message: "Internal server error", error: e });
        }
    });

    router.get("/session", (req, res) => {
        try{
            if (req.session.userid) {
                res.status(200).json({
                    message: "User logged in",
                    userid: req.session.userid,
                    usertype: req.session.usertype
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
                    message: "Requête invalide : login et password nécessaires"
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
            let user = await users.checkPassword(login, password);
            if (user) {
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
                        req.session.userid = user._id;
                        req.session.usertype =  user.type;
                        res.status(200).json({
                            status: 200,
                            id: user._id,
                            usertype: user.type,
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


    router
        .route("/users")
        .get(async (req, res) => {

        try {
            const {login=null,id=null,type=null} = req.query;

            const newObectId = id ? new ObjectId(id) : null;

            const user = await users.get(newObectId,login,type);
            if (user.length == 0)
                res.sendStatus(404);
            else
                res.status(200).send(user);
        }
        catch (e) {
            res.status(500).send(e);
        }
    })//fait
    .delete(async(req, res, next) => {
    try {
        const user = await users.deleteUser(req.params.user_id);
        if (!user)
            res.sendStatus(404);
        else
            res.status(200).send("User deleted");
    }
    catch (e) {
        res.status(500).send(e);
    }
    });

    //fait
    router.put("/user", async (req, res) => {
        const { login, password, lastname, firstname } = req.body;
        if (!login || !password || !lastname || !firstname) {
            res.status(400).send("Missing fields");
        } else {
            try{
                if (await users.exists(login)) {
                    res.status(409).send("User already exists");
                    return;
                }

                const result = await users.create(login, password, lastname, firstname);
                if (result) {
                    res.status(200).send("User created");
                } else {
                    res.status(500).send("Error creating user");
                }
            }catch(e){
                res.status(500).send(e);
            }
        }
    });




    return router;
}
exports.default = init;
