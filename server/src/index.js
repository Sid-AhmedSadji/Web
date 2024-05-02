const app = require("./app.js").default;; //Importe l'instance d'Express configurée depuis le fichier app.js
const port = 4000; //Définit le port sur lequel le serveur doit écouter
const WebSocket = require('ws'); //Importe la bibliothèque

//Lance le serveur pour écouter sur le port spécifié
const server = app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});

const wss = new WebSocket.Server({ server }); //Créer une nouvelle WebSocket

wss.on('connection', function connection(ws) {
  console.log('Un client WebSocket s\'est connecté.');

  ws.on('message', function incoming(message) {
    console.log('reçu: %s', message);

    //Diffusion du message à tous les clients connectés
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => console.log('Un client WebSocket s\'est déconnecté.'));
});

//Ce fichier est utilisé pour démarrer le serveur web, afin qu'il écoute sur le port 4000. Mais il ne faudait pas plutôt, le port 5173 pour cela ? 
