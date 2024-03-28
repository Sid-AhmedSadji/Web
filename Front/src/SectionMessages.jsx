import SingleMessage from "./Message";
import styles from './Css/SectionMessages.module.css';

function Messages({ showAuthor, listeMessages }) {
  return (
    <div className={styles.main}>
      <ul className={styles.myUl}>
        {listeMessages.map((message,index) => (
          <li key={index} className={styles.myLi}>
            <SingleMessage showAuthor={showAuthor} author_name={message.author_name} message={message.text} />
          </li>
        ))}
      </ul>
      <div className={styles.menuContainer}>
      </div>
    </div>
  );
}

export default Messages;
