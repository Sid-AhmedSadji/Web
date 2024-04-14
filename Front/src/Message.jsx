import styles from './Css/Message.module.css';
import { Link } from 'react-router-dom';
import TimeAgo from 'react-timeago';
import { HiTrash } from "react-icons/hi"; //Importation de l'icône de poubelle pour le bouton de suppression
import Api from './ApiCalls.js';



function Message(props) {

  const { message, date, author_name, _id, title} = props.Message; //Destructuration pour obtenir les détails du message depuis les props
  const { nbMax } = props; //Nombre maximal de caractères à afficher avant la troncature

  let msg = message;
  if (nbMax > 0 && message.length > nbMax) //Tronque le message si plus long que nbMax
    msg = message.slice(0, nbMax) + ' [...]';

  return (
    <div className={styles.mainDiv}>
      <div className={styles.headerDiv}>
        <Link to={`/profil/${author_name}`} className={styles.link}>
          <p className={styles.pseudo}>@{author_name}</p>
        </Link>
        <p className={styles.title}> - {title}</p>
        <TimeAgo className={styles.timeAgo} date={date} />
      </div>
      <Link to={`/Messages/${_id}`} className={styles.link}>
        <p className={styles.text}>{msg}</p>
      </Link>
      {props.type === 'admin' && <button className={styles.btnDiv} onClick={() => {Api.deleteMessage(_id); props.loading && props.loading(true)}}><HiTrash /></button>}
    </div>
  );

}

export default Message;

