import React, { useState, useEffect } from 'react';
import ApiCalls from './ApiCalls'; //On suppose que ce fichier gère les appels API
import MessageItem from './MessageItem';

function PrivateChat({ userId, peerId }) {
  //Message privé (Système de chat interne entre deux utilisateurs)
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    //Fonction asynchrone pour récupérer et définir les messages.
    const fetchConversation = async () => {
      try {
        const msgs = await ApiCalls.getConversation(userId, peerId);
        setMessages(msgs);
      } catch (error) {
        console.error('Failed to fetch conversation:', error);
      }
    };

    fetchConversation();
  }, [userId, peerId]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      const message = await ApiCalls.sendPrivateMessage(userId, peerId, newMessage);
      setMessages([...messages, message]);
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div>
      <div>
        {messages.map(message => (
          <MessageItem key={message.id} message={message} currentUserId={userId} />
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={e => setNewMessage(e.target.value)}
        placeholder="Write a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default PrivateChat;
