import styles from './Css/Message.module.css';
import { Link } from 'react-router-dom';

function Message({ showAuthor, author_name, message, id }) {
  var msg = message;

  if (message.length > 60) {
    msg = message.slice(0, 60) + ' [...]';
  }

  return (
    <div className={styles.message}>
      {showAuthor ? 
        <>
          <Link className={styles.linkBtntitle} to={`/profil/${author_name}`}>
            <button className={styles.linkBtntitle}>{author_name}</button>
          </Link> 
          <hr className={styles.separator} />
        </>

      : null}
      <Link className={styles.linkBtn} to={`/Messages/${id}`}>
        <button className={styles.linkBtn}>{msg}</button>
      </Link>
    </div>
  );
}

export default Message;
