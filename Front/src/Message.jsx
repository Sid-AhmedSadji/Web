import styles from './Css/Message.module.css';
import { Link } from 'react-router-dom';

function Message({ showAuthor, author_name, message, id }) {
  var msg = message;

  if (message.length > 60) {
    msg = message.slice(0, 60) + ' [...]';
  }

  return (
    <div className={styles.message}>
      {showAuthor ? <Link className={styles.linkBtn} to={`/profil/${author_name}`}>
        <button className={styles.linkBtn}>{author_name}</button>
      </Link> : null}
      <Link className={styles.linkBtn} to={`/Messages/${id}`}>
        <button className={styles.linkBtn}>{msg}</button>
      </Link>
    </div>
  );
}

export default Message;
