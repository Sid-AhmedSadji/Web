import Header from "./Header.jsx"
import Messages from"./SectionMessages.jsx"
import { useState,useEffect } from "react";
import styles from "./Css/Profil.module.css"
import { useParams } from "react-router-dom";




function Profil (){
  const [loading, setLoading] = useState(true);
  const [listeMessages, setListeMessages] = useState([]);
  const [user, setUser] = useState(null);
  const {userPseudo} =  useParams();
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch('http://localhost:4000/api/user/1');
        if (response.status!==200) {
          throw new Error('Erreur lors de la récupération des données utilisateur');
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false); // Mettre fin au chargement en cas d'erreur
      }
    }
  
    async function fetchMessages() {
      try {
        const response = await fetch('http://localhost:4000/api/messages');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données des messages');
        }
        const data = await response.json();

        setListeMessages(data);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchUser();
    fetchMessages();

  }, []);

  if(user === null){
    return (
      <div>
        <p>Utilisateur non connecté</p>
      </div>
    )
  }


  return (
    <div className={styles.globalDiv}>

      <Header searBar={false}/>

      <div className={styles.mainDiv}> 
       
        <div className={styles.user}>
       
          <img className={styles.avatar} src={"https://api.multiavatar.com/"+user.login+".png"} alt="Avatar" />
          <p>user : {user.login}</p>
          <p>firstName : {user.firstname}</p>
          <p>lastName : {user.lastname}</p>
          <p>role : {user.type === 2 ? "admin" : "user" }</p> 
          <p>date :  On verra</p>

        </div>

        <div className={styles.messageDiv}    >

         <p>Message</p>

         <div className={styles.messages}>
          
            <Messages showAuthor={false} listeMessages={listeMessages} />
          
          </div>


        </div>

       


      </div>



    </div>


  );
};
export default Profil ;
/*
*/