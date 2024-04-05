const path = require('path');
const api = require('./api.js');
const privateMessagesRouter = require('./routes/privateMessages');
const cors = require('cors');

// Détermine le répertoire de base
const basedir = path.normalize(path.dirname(__dirname));
console.debug(`Base directory: ${basedir}`);

express = require('express');
const app = express()
const session = require("express-session");

const MongoClient = require('mongodb').MongoClient;
//const dbUrl  = "mongodb://127.0.0.1:27017/AssosDataBase";
// const dbUrl = "mongodb://192.168.1.55:27017/AssosDataBase";
const dbUrl = "mongodb+srv://sid:sid@cluster0.gunaxvp.mongodb.net/AssosDataBase"
const db = MongoClient.connect(dbUrl);

app.use(cors({
    origin: "http://localhost:5173",
    // origin: "http://192.168.1.55:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
}));

app.use(session({
    secret: "technoweb rocks",
    resave: false,
    saveUninitialized: false,

    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        secure: false,
        httpOnly: false, }
}));

app.use('/api', api.default(dbUrl));

// Démarre le serveur
app.on('close', () => {
});
exports.default = app;

app.use('api', privateMessagesRouter);
