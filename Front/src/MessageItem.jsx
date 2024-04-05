import React from 'react';

function MessageItem({ message, currentUserId }) {
  const isOwnMessage = message.senderId === currentUserId;

  return (
    <div style={{ textAlign: isOwnMessage ? 'right' : 'left' }}>
      <div>{message.text}</div>
      <div><small>{new Date(message.timestamp).toLocaleString()}</small></div>
    </div>
  );
}

export default MessageItem;