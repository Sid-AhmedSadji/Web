import SingleMessage from "./Message";
import styles from './Css/SectionMessages.module.css';

//Définition du composant avec props pour la liste des messages, un indicateur de chargement, et le type de l'utilisateur
function Messages({ listeMessages, loading, type, idUser }) {

  return (
    <div className={styles.main}>
      <ul className={styles.myUl}>
        {listeMessages.filter(message => message.id_Parent === "0" && !message.reports.includes(idUser) && message.reports.length < 10) 
          .map((message, index) => (
            <li key={index} className={styles.myLi}>
              <SingleMessage
                Message={message}
                loading={loading}
                nbMax={60}
                type={type}
                idUser={idUser}
              />
            </li>
          ))}
      </ul>
      <div className={styles.menuContainer}>
      </div>
    </div>
  );
}

export default Messages;

//Le composant Messages (SectionMessages) est conçu pour afficher une liste de messages principaux (c'est-à-dire ceux qui n'ont pas de message parent, ceux qui démarre le sujet).
