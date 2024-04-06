import styles from './Css/Message.module.css';
import { Link } from 'react-router-dom';
import TimeAgo from 'react-timeago';
import { HiTrash } from "react-icons/hi";
import { HiChatBubbleLeft } from "react-icons/hi2";



function Message(props) {


  const { message, date, author_name, _id, title} = props.Message ;
  const { nbMax } = props;

  let msg = message;
  if (nbMax>0 && message.length > nbMax)
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
        <button className={styles.btnDiv}><HiTrash /></button>
      </div>
    );
  
}

export default Message;

