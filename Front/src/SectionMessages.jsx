import SingleMessage from "./Message";
import styles from './Css/SectionMessages.module.css';

function Messages({ listeMessages }) {
  return (
    <div className={styles.main}>
      <ul className={styles.myUl}>
        {listeMessages.map((message,index) => (
          <li key={index} className={styles.myLi}>
            <SingleMessage titre={message.author_name} message={message.text} id={message.id}/>
          </li>
        ))}
      </ul>
      <div className={styles.menuContainer}>
      </div>
    </div>
  );
}

export default Messages;
