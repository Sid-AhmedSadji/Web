import Header from "./Header.jsx"
import { useState,useEffect } from "react";
import styles from "./Css/Profil.module.css"
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "./ApiCalls.js"
import Messages from"./SectionMessages.jsx"

function Message({ message, id }) {
  var msg = message;

  if (message.length > 60) {
    msg = message.slice(0, 60) + ' [...]';
  }

  return (
    <div className={styles.message}>
      <Link className={styles.linkBtn} to={`/Messages/${id}`}>
        <button className={styles.linkBtn}>{msg}</button>
      </Link>
    </div>
  );

  }


function Profil (){
  const [loading, setLoading] = useState(true);
  const [listeMessages, setListeMessages] = useState([]);
  const [user, setUser] = useState(null);
  const {login} =  useParams();
  const [clicked, setclicked ] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await api.getUser({login:login, id:null, type:null});
        setUser(data[0]);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false); // Finish loading in case of error
      }finally {
        setLoading(false);
      }
    }
  
    async function fetchMessages() {
      try {
        const data = await api.getMessages("public");
        setListeMessages(data.messages.filter(message => message.author_name===login ));
      } catch (error) {
        console.error('Error:', error);
      }
    }

    async function checkSession () {
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

  if (loading) {
    return <div>Loading...</div>;
  }

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


