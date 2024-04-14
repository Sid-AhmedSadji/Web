import React from 'react';
import styles from './Css/AfficheMessage.module.css'; // Import CSS module
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TimeAgo from 'react-timeago' //Importe un composant pour formater les dates relativement (ex : il y a 3 heures), mais il n'est pas utilisé. 
import api from './ApiCalls';
import Message from './Message';

let nbMessageAfficher = 2 ; //Nombre initial de messages à afficher

//Composant pour ordonner et afficher une liste de messages récursivement
function OrderListe({ listeMessages, id , i }) {

    const filteredMessages = listeMessages.filter(message => message.id_Parent === id);
   
    if (filteredMessages.length === 0) return null; //S'il n'y a pas de messages enfants, retourne null

    if ( i === 0 ){ //Si le niveau de profondeur est 0, affiche un lien pour voir plus de réponses
        return(
            <p style={{paddingLeft : "50px", paddingBottom : "15px"}}>
                <Link to={`/Messages/${id}`}>Show responses</Link>
            </p>
        )
    }

    //Affiche les messages enfants récursivement
    return (
        <>
        <ul className={styles.myUl}>
            {filteredMessages.map((topic, index) => (
                <li className={styles.myLi} key={topic._id}>
                    <>
                    <Message Message={topic} nbMax={0} />

                    </>
                    <OrderListe listeMessages={listeMessages} id={topic._id} i={i-1} />
                </li>
            ))}
            <hr style={{width : "65%"}} />
        </ul>
        
        </>
    );
}

//Composant principal pour afficher les messages
function App(props) {

    const { id, topic } = props;
    
    const [loading, setLoading] = useState(true); //Gère l'état de l'affichage du chargement
    const [listeMessages, setListeMessages] = useState([]); //Stocke la liste des messages récupérés

  
  
    useEffect(() => {
        //Récupère les messages depuis l'API
        async function fetchMessages() {
            try {
              const Message = await api.getMessages(topic.privacy);
              setListeMessages(Message.messages);

            } catch (error) {
              console.error('Error:', error);
            }finally{
                setLoading(false);
            }
          }
  
      fetchMessages();
    }, []);
    
    //Affiche le chargement
    if (loading) {
      return <div>Loading...</div>;
    }

    return (
        <div style={{ margin: '30px' , boxSizing: 'border-box' }}>
            {topic && (
                  <Message Message={topic} nbMax={0} />
            )}
            <OrderListe listeMessages={listeMessages} id={id} i={nbMessageAfficher} />
        </div>
    );

} 

export default App;


