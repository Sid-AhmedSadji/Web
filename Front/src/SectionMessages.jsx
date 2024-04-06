import SingleMessage from "./Message";
import styles from './Css/SectionMessages.module.css';

function Messages({ showAuthor, listeMessages }) {
  return (
    <div className={styles.main}>
      <ul className={styles.myUl}>
        {listeMessages.filter(message => message.id_Parent === "0").map((message,index) => (
          <li key={index} className={styles.myLi}>
            <SingleMessage Message={message} nbMax={60} />
          </li>
        ))}
      </ul>
      <div className={styles.menuContainer}>
      </div>
    </div>
  );
}

export default Messages;
