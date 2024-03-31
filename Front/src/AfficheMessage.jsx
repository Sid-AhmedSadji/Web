import React from 'react';
import styles from './Css/AfficheMessage.module.css'; // Importez le module CSS
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TimeAgo from 'react-timeago'
import api from './ApiCalls';

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
        <ul className={styles.myUl}>
            {filteredMessages.map((messageRecherche, index) => (
                <li className={styles.myLi} key={messageRecherche._id}>
                    <div className={styles.orderListe}>
                        <Link to={`/profil/${messageRecherche.author_name}`} className={styles.link} >
                            <div className={styles.borderText}>
                                <p className={styles.myP} >@{messageRecherche.author_name} : {messageRecherche.title}</p>
                                <TimeAgo style={{fontSize: "8px" , paddingLeft : "30px", fontStyle : "italic" }} date={messageRecherche.date} />

                            </div>
                        </Link>
                        <Link to={`/Messages/${messageRecherche._id}`} className={styles.link}>
                            <p>{messageRecherche.message}</p>
                        </Link>
                    </div>

                        <OrderListe listeMessages={listeMessages} id={messageRecherche._id} i={i-1} />
                    
                </li>
            ))}
        </ul>
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
              
              const data = await api.getMessages();
      
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
    const messageRecherche = listeMessages.find(message => message._id === id);

    return (
        <div style={{ margin: '30px' }}>
            {messageRecherche && (
                <div className={styles.orderListe}>
                    <Link to={`/profil/${messageRecherche.author_name}`} className={styles.link} >
                        <div className={styles.borderText}>
                            <p className={styles.myP} >@{messageRecherche.author_name} : {messageRecherche.title}</p>
                            <TimeAgo style={{fontSize: "8px" , paddingLeft : "30px"}} date={messageRecherche.date} />
                        </div>
                    </Link>

                    <p>{messageRecherche.message}</p>
                </div>
            )}
            <OrderListe listeMessages={listeMessages} id={id} i={nbMessageAfficher} />
        </div>
    );

} 

export default App;
