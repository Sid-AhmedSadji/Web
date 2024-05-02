import React, { useState, useEffect } from 'react';
import styles from './Css/GlobalChat.module.css';

function GlobalChat({ userId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [ws, setWs] = useState(null); //Etat pour la WebSocket

  useEffect(() => {
    //Canal du WebSocket pour le chat global
    const websocket = new WebSocket('ws://localhost:4000/');
    setWs(websocket);

    websocket.onmessage = (event) => {
      //Vérifie si le message est en format Blob(Format Binaire)
      if (event.data instanceof Blob) {
        //Lire le contenu du Blob en tant que texte
        const reader = new FileReader();
        reader.onload = () => {
          console.log("Message reçu (text):", reader.result);
          try {
            const message = JSON.parse(reader.result);
            setMessages((prevMessages) => [...prevMessages, message]);
          } catch (e) {
            console.error("Erreur lors de l'analyse du message:", e);
          }
        };
        reader.readAsText(event.data);
      } else {
        //Traiter comme du texte JSON si ce n'est pas un Blob
        console.log("Message reçu (JSON):", event.data);
        try {
          const message = JSON.parse(event.data);
          setMessages((prevMessages) => [...prevMessages, message]);
        } catch (e) {
          console.error("Erreur lors de l'analyse du message:", e);
        }
      }
    };
    

    //Nettoyage en fermant la WebSocket quand le composant se démonte
    return () => {
      websocket.close();
    };
  }, []);

  const sendMessage = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ text: newMessage, senderId: userId }));
      setNewMessage('');
    } else {
      console.error('WebSocket is not open.');
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messagesList}>
        {messages.map((message, index) => (
          <div key={index} className={styles.messageItem}>
            {message.senderId === userId ? 'Vous' : message.senderId}: {message.text}
          </div>
        ))}
      </div>
      <div className={styles.messageInput}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Tapez votre message ici"
        />
        <button onClick={sendMessage}>Envoyer</button>
      </div>
    </div>
  );
}

export default GlobalChat;


/*
import React, { useState, useEffect } from 'react';
import styles from './Css/GlobalChat.module.css';
function GlobalChat({ userId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  
  useEffect(() => {
    // Ici, tu ajouterais la logique pour écouter les nouveaux messages venant du serveur
    // Par exemple, tu pourrais écouter un WebSocket ou faire un polling d'une API REST

    //Canal du WebSocket pour le chat global
    const ws = new WebSocket('ws://localhost:4000/');

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    //Nettoyage en fermant la WebSocket quand le composant se démonte
    return () => {
      ws.close();
    };

  }, []);

  const sendMessage = () => {
    // Logique pour envoyer un nouveau message au serveur
    // Ajoute également le message à la liste des messages localement
    
    //Crée une connexion WebSocket pour envoyer le message
    const ws = new WebSocket('ws://localhost:4000/');
    ws.onopen = () => {
      ws.send(JSON.stringify({ text: newMessage, senderId: userId }));
      setNewMessage('');
    };
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messagesList}>
        {messages.map((message, index) => (
          <div key={index} className={styles.messageItem}>
            {message.senderId === userId ? 'Vous' : message.senderId}: {message.text}
          </div>
        ))}
      </div>
      <div className={styles.messageInput}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Tapez votre message ici"
        />
        <button onClick={sendMessage}>Envoyer</button>
      </div>
    </div>
  );
}

export default GlobalChat;
*/
/*
import React, { useState, useEffect, useRef } from 'react';
import styles from './Css/GlobalChat.module.css';

function GlobalChat({ userId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const ws = useRef(); //useRef est utilisé ici, pour maintenir la même référence de WebSocket
  
  //Canal du WebSocket pour le chat global
  ws.current = new WebSocket('ws://localhost:4000')

  useEffect(() => {
    // Ici, tu ajouterais la logique pour écouter les nouveaux messages venant du serveur
    // Par exemple, tu pourrais écouter un WebSocket ou faire un polling d'une API REST



    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    /*
    ws.current.onclose = () => {
      console.log('Connexion WebSocket fermée. Tentative de reconnexion...');
      // Implémenter une stratégie de reconnexion si nécessaire
    };
    */
    
    /*//Nettoyage en fermant la WebSocket quand le composant se démonte
    return () => {
      ws.close();
    };

  }, []);

  const sendMessage = () => {
    // Logique pour envoyer un nouveau message au serveur
    // Ajoute également le message à la liste des messages localement
    
    //Envoies le message
    ws.current.onopen = () => {
      ws.current.send(JSON.stringify({ text: newMessage, senderId: userId }));
      setNewMessage('');
    };
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messagesList}>
        {messages.map((message, index) => (
          <div key={index} className={styles.messageItem}>
            {message.senderId === userId ? 'Vous' : message.senderId}: {message.text}
          </div>
        ))}
      </div>
      <div className={styles.messageInput}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Tapez votre message ici"
        />
        <button onClick={sendMessage}>Envoyer</button>
      </div>
    </div>
  );
}

export default GlobalChat;

*/