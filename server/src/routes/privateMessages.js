const express = require('express');
const router = express.Router();
const PrivateMessage = require('../entities/privateMessages');

//Simule une base de données en mémoire
let privateMessages = [];

//Envoie un message privé
router.post('/send', (req, res) => {
  const { senderId, receiverId, text } = req.body;
  const newMessage = new PrivateMessage(
    privateMessages.length + 1, // ID simplifié
    senderId,
    receiverId,
    text,
    new Date()
  );
  privateMessages.push(newMessage);
  res.status(201).send(newMessage);
});

//Récupére les messages privés entre deux utilisateurs
router.get('/conversation', (req, res) => {
  const { user1, user2 } = req.query;
  const conversation = privateMessages.filter(msg =>
    (msg.senderId === user1 && msg.receiverId === user2) ||
    (msg.senderId === user2 && msg.receiverId === user1)
  );
  res.status(200).send(conversation);
});

module.exports = router;
