import React from 'react';
import styles from './Css/AfficheMessage.module.css'; // Importez le module CSS
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TimeAgo from 'react-timeago'
import api from './ApiCalls';
import Message from './Message';

let nbMessageAfficher = 2 ;

function OrderListe({ listeMessages, id , i }) {

    const filteredMessages = listeMessages.filter(message => message.id_Parent === id);
   
    if (filteredMessages.length === 0) return null; 

    if ( i === 0 ){
        return(
            <p style={{paddingLeft : "50px", paddingBottom : "15px"}}>
                <Link to={`/Messages/${id}`}>More responses</Link>
            </p>
        )
    }


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
        <div style={{ margin: '30px' , boxSizing: 'border-box' }}>
            {topic && (
                  <Message Message={topic} nbMax={0} />
            )}
            <OrderListe listeMessages={listeMessages} id={id} i={nbMessageAfficher} />
        </div>
    );

} 

export default App;
