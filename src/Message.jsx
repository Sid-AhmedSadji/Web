import styles from './Css/Message.module.css';
import rgbStyle from './Css/RGB.module.css';
import { Link } from 'react-router-dom';
import Page from './MessagePage.jsx';

function Message({ titre, message, id }) {
  var msg = message;

  if (message.length > 60) {
    msg = message.slice(0, 60) + ' [...]';
  }

  return (
    <div className={styles.message}>
      <p>{titre}</p>
      <Link className={styles.linkBtn} to={`/Messages/${id}`}>
        <button className={styles.linkBtn}>{msg}</button>
      </Link>
      <button className={styles.button85}>+</button>
    </div>
  );
}

export default Message;
