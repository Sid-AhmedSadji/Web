import React from 'react';
import styles from './Css/AfficheMessage.module.css'; // Importez le module CSS

function OrderListe({ listeMessages, id }) {
    const filteredMessages = listeMessages.filter(message => message.id_Parent === id);

    // Vérifiez si la liste filtrée est vide
    if (filteredMessages.length === 0) {
        return null; // Si elle est vide, retournez null pour ne rien afficher
    }

    return (
        <div className={styles.orderListe}>
            <ul>
                {filteredMessages.map((message, index) => (
                    <li key={message._id}>
                        <h4>{message.text}</h4>
                        <OrderListe listeMessages={listeMessages} id={message._id} />
                    </li>
                ))}
            </ul>
            <hr className={styles.styledBar} />
        </div>
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
            "_id": "Az12pLoxwjcbyCAg",
            "id_Parent": "9a0hnDw3nJljzViW"
        }
    ];

    return (
        <div width="100%">
            <h1>Messages</h1>
            <OrderListe listeMessages={listeMessages} id="0" />
        </div>
    );
}

export default App;
