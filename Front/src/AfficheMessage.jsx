import React from 'react';
import styles from './Css/AfficheMessage.module.css'; // Importez le module CSS
import { Link, useParams } from 'react-router-dom';

let nbMessageAfficher = 2 ;

function OrderListe({ listeMessages, id , i }) {

    const filteredMessages = listeMessages.filter(message => message.id_Parent === id);
   
    if (filteredMessages.length === 0) return null; 

    if ( i === 0 ){
        return(
            <Link to ={`/Messages/${id}`}>
                <p style={{paddingLeft : "50px", paddingBottom : "15px"}}>More responses</p>
            </Link>
        )
    }


    return (
        <>
            <ul className={styles.myUl}>
                {filteredMessages.map((message, index) => (
                    <li className={styles.myLi} key={message._id}>
                        <Link to ={`/Messages/${message._id}`} className={styles.link} >
                            <div className={styles.orderListe}>
                                <div className={styles.hole1}></div>
                                <div className={styles.hole2}></div>
                                <div className={styles.borderText}>@{message.author_name}</div>
                                <p>{message.text}</p>
                            </div>
                        </Link>
                        <OrderListe listeMessages={listeMessages} id={message._id} i={i-1} />
                    </li>
                ))}
            </ul>
        </>
    );
    

        
}

function App() {

    /*get id from url */
    const { id } = useParams(); // Récupère l'ID à partir de l'URL
    
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
            "text": "Je saute MEGA haut",
            "_id": "APODSOPQIDS",
            "id_Parent": "9a0hnDw3nJljzViW"
        },
        {
            "author_name": "CR7",
            "author_id": "18",
            "text": "Je saute tres haut",
            "_id": "Wuofdfus85798",
            "id_Parent": "Az12pLoxwjcbycag"
        }
    ];

    const message = listeMessages.find(message => message._id === id);

    return (
        <div style={{ margin: '30px' }}>
            <div className={styles.orderListe}>
                <div className={styles.hole1}></div>
                <div className={styles.hole2}></div>
                <div className={styles.borderText}>@{message.author_name}</div>
                <p>{message.text}</p>
            </div>
            <OrderListe listeMessages={listeMessages} id={id} i={nbMessageAfficher} />
        </div>
    );
} 

export default App;



    