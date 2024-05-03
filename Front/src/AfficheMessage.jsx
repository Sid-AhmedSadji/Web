import {Link,useState,useEffect} from 'react'
import styles from './Css/AfficheMessage.module.css'
import api from './ApiCalls'
import Message from './Message'

let nbMessageAfficher = 2 ; //Nombre initial de reponses à afficher par message

//Composant pour ordonner et afficher une liste de messages récursivement
function OrderListe({ listeMessages, id , i, type, idUser}) {

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
                        <Message Message={topic} nbMax={0} type={type} idUser={idUser}/>
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

    const { id, topic, userid } = props;

    
    const [loading, setLoading] = useState(true); //Gère l'état de l'affichage du chargement
    const [listeMessages, setListeMessages] = useState([]); //Stocke la liste des messages récupérés
    const [type , setType] = useState(null);

  
  
    useEffect(() => {
        //Récupère les messages depuis l'API
        async function fetchMessages() {
            try {
              const Message = await api.getMessages(topic.privacy);
              //retire les messages que userid a reports 
              setListeMessages(Message.messages.filter(message => !message.reports.includes(userid) && message.reports.length < 10));
            } catch (error) {
              console.error('Error:', error);
            }
        }


        async function fetchUser() {
            try {
                const data = await api.checkSession();
                setType(data.usertype);
            } catch (error) {
                console.error("Error", error.response.data.message);
            }finally{
                setLoading(false);
            }
        }
  
      fetchMessages();
      fetchUser();
    }, []);
    
    //Affiche le chargement
    if (loading) {
      return <div>Loading...</div>;
    }


    return (
        <div style={{ margin: '30px' , boxSizing: 'border-box' }}>
            {topic && (
                  <Message Message={topic} nbMax={0} type={type} idUser={userid}/>
            )}
            <OrderListe listeMessages={listeMessages} id={id} i={nbMessageAfficher} type={type} idUser={userid}/>
        </div>
    );

} 

export default App;


