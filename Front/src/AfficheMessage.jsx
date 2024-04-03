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
            {filteredMessages.map((topic, index) => (
                <li className={styles.myLi} key={topic._id}>
                    <div className={styles.orderListe}>
                        <Link to={`/profil/${topic.author_name}`} className={styles.link} >
                            <div className={styles.borderText}>
                                <p className={styles.myP} >@{topic.author_name} : {topic.title}</p>
                                <TimeAgo style={{fontSize: "8px" , paddingLeft : "30px", fontStyle : "italic" }} date={topic.date} />

                            </div>
                        </Link>
                        <Link to={`/Messages/${topic._id}`} className={styles.link}>
                            <p>{topic.message}</p>
                        </Link>
                    </div>

                        <OrderListe listeMessages={listeMessages} id={topic._id} i={i-1} />
                    
                </li>
            ))}
        </ul>
    );

        
}

function App(props) {

    const { id, topic } = props;
    
    const [loading, setLoading] = useState(true);
    const [listeMessages, setListeMessages] = useState([]);

  
  
    useEffect(() => {
  
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
    
    if (loading) {
      return <div>Loading...</div>;
    }

    return (
        <div style={{ margin: '30px' }}>
            {topic && (
                <div className={styles.orderListe}>
                    <Link to={`/profil/${topic.author_name}`} className={styles.link} >
                        <div className={styles.borderText}>
                            <p className={styles.myP} >@{topic.author_name} : {topic.title}</p>
                            <TimeAgo style={{fontSize: "8px" , paddingLeft : "30px"}} date={topic.date} />
                        </div>
                    </Link>

                    <p>{topic.message}</p>
                </div>
            )}
            <OrderListe listeMessages={listeMessages} id={id} i={nbMessageAfficher} />
        </div>
    );

} 

export default App;
