const app = require("./app.js"); //Importe l'instance d'Express configurée depuis le fichier app.js
const port = 4000; //Définit le port sur lequel le serveur doit écouter

//Lance le serveur pour écouter sur le port spécifié
app.default.listen(port, () => {
  console.log(`Serveur actif sur le port ${port}`);
});

//Ce fichier est utilisé pour démarrer le serveur web, afin qu'il écoute sur le port 4000. Mais il ne faudait pas plutôt, le port 5173 pour cela ? 
