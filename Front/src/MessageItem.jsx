import React from 'react';

//Définition du composant MessageItem qui prend `message` et `currentUserId` comme props
function MessageItem({ message, currentUserId }) {
  //Détermine si le message a été envoyé par l'utilisateur actuel
  const isOwnMessage = message.senderId === currentUserId;

  return (
    <div style={{ textAlign: isOwnMessage ? 'right' : 'left' }}>
      <div>{message.text}</div>
      <div>
        <small>{new Date(message.timestamp).toLocaleString('en-GB')}</small>
      </div>
    </div>
  );
}

export default MessageItem;

//Affiche un message individuel
