import SingleMessage from "./Message";
import styles from './Css/SectionMessages.module.css';

function Messages({ listeMessages, loading, type }) {
  return (
    <div className={styles.main}>
      <ul className={styles.myUl}>
        {listeMessages.filter(message => message.id_Parent === "0")
          .map((message, index) => (
            <li key={index} className={styles.myLi}>
              <SingleMessage
                Message={message}
                loading={loading}
                nbMax={60}
                type={type}
              />
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Messages;

