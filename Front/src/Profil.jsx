import Header from "./Header.jsx"
import { useState,useEffect } from "react";
import styles from "./Css/Profil.module.css"
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "./ApiCalls.js"

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
        setLoading(false); // Mettre fin au chargement en cas d'erreur
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
        navigate ("/");// Marque la fin du chargement, que ce soit avec succès ou non

      }
    };

    checkSession();


  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  function userDiv() {
    return (
      <div className={styles.user}>
       
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

         <h2>Messages</h2>

         <div className={styles.messages}>
          
            <ul className={styles.myUl}>
            {listeMessages.map((message) => (
              <li key={message._id} className={styles.myIl}> 
                <Message showAuthor={false} author_name={message.author_name} message={message.message} id={message._id} />
              </li>
            ))}
          </ul>
          
          </div>


        </div>
    );
  }


  return (
    <div className={styles.globalDiv}>

      <Header searBar={false}/>

      <div className={styles.mainDiv}> 

        <button className={styles.userButton} onClick={()=>setclicked(!clicked)}>{clicked ? "X" : "<=" }</button>
       
        

        {clicked ? userDiv() : messageDiv()}

       


      </div>



    </div>


  );
};
export default Profil ;



