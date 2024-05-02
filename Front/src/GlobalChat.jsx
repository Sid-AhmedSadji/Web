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
