import React from 'react';
import styles from './Css/AfficheMessage.module.css'; // Importez le module CSS
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

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
                    <li className={styles.myLi} key={message.id}>
                        <Link to ={`/Messages/${message.id}`} className={styles.link} >
                            <div className={styles.orderListe}>
                                <div className={styles.hole1}></div>
                                <div className={styles.hole2}></div>
                                <div className={styles.borderText}>@{message.author_name}</div>
                                <p>{message.text}</p>
                            </div>
                        </Link>
                        <OrderListe listeMessages={listeMessages} id={message.id} i={i-1} />
                    </li>
                ))}
            </ul>
        </>
    );
    

        
}

function App() {

    /*get id from url */
    const { id } = useParams(); // Récupère l'ID à partir de l'URL
    
    const [loading, setLoading] = useState(true);
    const [listeMessages, setListeMessages] = useState([]);
  
  
    useEffect(() => {
  
      async function fetchMessages() {
        try {
          const response = await fetch('http://localhost:8000/api/messages');
          if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
          }
          const data = await response.json();
  
          setListeMessages(data);
          setLoading(false);
        } catch (error) {
          console.error('Error:', error);
          setLoading(false);
        }
      }
  
      fetchMessages();
    }, []);
    
    if (loading) {
      return <div>Loading...</div>;
    }


    // Utilisez la méthode `find()` pour rechercher l'élément par son ID
    const messageRecherche = listeMessages.find(message => message.id === id);

    return (
        <div style={{ margin: '30px' }}>
            {messageRecherche && (
                <div className={styles.orderListe}>
                    <div className={styles.hole1}></div>
                    <div className={styles.hole2}></div>
                    <div className={styles.borderText}>@{messageRecherche.author_name}</div>
                    <p>{messageRecherche.text}</p>
                </div>
            )}
            <OrderListe listeMessages={listeMessages} id={id} i={nbMessageAfficher} />
        </div>
    );
    } 

export default App;
