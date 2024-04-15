import Header from "./Header.jsx"
import { useState,useEffect } from "react";
import styles from "./Css/Profil.module.css"
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "./ApiCalls.js" //Importation des appels API
import Messages from"./SectionMessages.jsx"

function Message({ message, id }) { //Composant pour afficher un message résumé avec un lien
  var msg = message;

  if (message.length > 60) {
    msg = message.slice(0, 60) + ' [...]';
  }
  //(linkBtn) Lien vers le message complet 
  return (
    <div className={styles.message}>
      <Link className={styles.linkBtn} to={`/Messages/${id}`}>
        <button className={styles.linkBtn}>{msg}</button>
      </Link>
    </div>
  );

  }


function Profil (){
  const [loading, setLoading] = useState(true); //État de chargement de la page
  const [listeMessages, setListeMessages] = useState([]); //État pour stocker les messages de l'utilisateur
  const [user, setUser] = useState(null); //État pour stocker les informations de l'utilisateur
  const {login} =  useParams(); //Récupère le paramètre login de l'URL
  const [clicked, setclicked ] = useState(true); //Gère l'affichage de la vue Profil ou Messages
  const navigate = useNavigate(); //Pour faire ?

  useEffect(() => {
    async function fetchUser() { //Récupère les informations de l'utilisateur
      try {
        const data = await api.getUser({login:login, id:null, type:null});
        setUser(data[0]);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false); // Finish loading in case of error (Je pense que cela ne sert à rien de mettre le setLoading ici, de toute façon cela se terminera toujours par un setLoading(False) qui est défini dans le finnaly).
      }finally {
        setLoading(false); //Termine le chargement
      }
    }
  
    async function fetchMessages() { //Récupère les messages de l'utilisateur
      try {
        const data = await api.getMessages("public");
        setListeMessages(data.messages.filter(message => message.author_name===login ));
      } catch (error) {
        console.error('Error:', error);
      }
    }

    async function checkSession () { //Vérifie la session et lance les fetchs
      try {
        console.log('Checking session...');
        const response = await api.checkSession();
        fetchUser();
        fetchMessages();
      } catch (error) {
        console.error("Error", error.response.data.message);
        navigate ("/");// Mark the end of loading, whether successful or not

      }
    };

    checkSession();


  }, []);

   //Affichage en cas de chargement
  if (loading) {
    return <div>Loading...</div>;
  }

  //Génère la vue (le render) avec les informations de l'utilisateur
  function userDiv() {
    return (
      
      <div className={styles.box}>
       
        <img className={styles.avatar} src={"https://api.multiavatar.com/"+login+".png"} alt="Avatar" />
        <p>Login : {user.login}</p>
        <p>Firstname : {user.firstname}</p>
        <p>Lastname : {user.lastname}</p>
        <p>Role : {user.type}</p> 
        <p>Number of Messages : {listeMessages.length}</p>
      </div>
    );
  }

  //Génère la vue (le render) avec les messages de l'utilisateur
  function messageDiv() {
    return (
      <div className={styles.messageDiv}    >


         <div className={styles.messages}>

         <Messages listeMessages={listeMessages} />
          
          </div>


        </div>
    );
  }


  return (
    <div className={styles.globalDiv}>

      <Header searBar={false}/>

      <div className={styles.mainDiv}> 

      <div className={styles.switch}>
          <button className={clicked ? styles.active : null} onClick={() => { setclicked(!clicked);  }}>Profile</button>
          <button className={!clicked ? styles.active : null} onClick={() => {setclicked(!clicked); }}>Messages</button>
        </div>
        

        {clicked ? userDiv() : messageDiv()}

       


      </div>



    </div>


  );
};
export default Profil ;


