import React from 'react';
import styles from './Css/AfficheMessage.module.css'; // Importez le module CSS

function OrderListe({ listeMessages, id }) {
    const filteredMessages = listeMessages.filter(message => message.id_Parent === id);

    // Vérifiez si la liste filtrée est vide
    if (filteredMessages.length === 0) {
        return null; // Si elle est vide, retournez null pour ne rien afficher
    }

    return (
        <>
            <ul className={styles.myUl}>
                {filteredMessages.map((message, index) => (
                    <li className={styles.myLi} key={message._id}>
                        <form className={styles.orderListe}>
                            <div className={styles.hole}></div>
                            <div className={styles.borderText}>@{message.author_name}</div>
                            <p>{message.text}</p>
                        </form>
                        <OrderListe listeMessages={listeMessages} id={message._id} />
                    </li>
                ))}
            </ul>
        </>
    );
    

        
}

function App() {
    const listeMessages = [
        {
            "author_name": "Dido",
            "author_id": "27",
            "text": "New Message",
            "_id": "0jd6M8cEMRqVPuKK",
            "id_Parent": "0"
        },
        {
            "author_name": "user1",
            "author_id": "21",
            "text": "message1",
            "_id": "9a0hnDw3nJljzViW",
            "id_Parent": "0jd6M8cEMRqVPuKK"
        },
        {
            "author_name": "CR7",
            "author_id": "18",
            "text": "Je saute haut",
            "_id": "Az12pLoxwjcbycag",
            "id_Parent": "9a0hnDw3nJljzViW"
        },
        {
            "author_name": "CR7",
            "author_id": "18",
            "text": "Je saute haut",
            "_id": "Az12pLoxwjcbyCAg",
            "id_Parent": "9a0hnDw3nJljzViW"
        }
    ];

    return (
        <div style={{ marginRight: '30px' }}>
            <OrderListe listeMessages={listeMessages} id="0" />
        </div>
    );
}

export default App;
