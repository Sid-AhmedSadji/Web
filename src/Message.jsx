import React from 'react'
import styles from './Css/Message.module.css';
import rgbStyle from './Css/RGB.module.css';

function Message({ titre, message, id, setPage }) {
  var msg = message;

  if (message.length > 60) {
    msg = message.slice(0, 60) + ' [...]';
  }

  return (
    <div className={styles.message}>
      <p>{titre}</p>
      <button onClick={()=>{setPage("Message")}} className={styles.linkBtn}>{msg}</button>
      <button className={styles.button85}>+</button>
    </div>
  );
}

export default Message;
