import Header from "./Header.jsx"
import Messages from"./SectionMessages.jsx"
import api from "./ApiCalls.js"
import styles from './Css/Home.module.css'
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Home(props) {

  const [loading, setLoading] = useState(true);
  const [listeMessages, setListeMessages] = useState([]);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [isSettingTitle, setIsSettingTitle] = useState(true);
  const [nbUser, setNbUser] = useState(0);
  const [nbMessage, setNbMessage] = useState(0);
  const [userType, setUserType] = useState('');
  const [isPrivate , setIsPrivate] = useState("public");
  let navigate = useNavigate();



  useEffect(() => {
    if (props.user === null) {
      navigate("/Login");
    }

    async function fetchUsers() {
      try {
        const response = await api.checkSession();
        const currentUserType = response.usertype ;
        setUserType(currentUserType);
      } catch (error) {
        console.error('Error:', error.response.message);
      } finally {
        setLoading(false);
      }
    }

    async function fetchMessages() {
      try {
        const data = await api.getMessages({privacy:isPrivate,id:null});
        setNbMessage(data.messages.length);
        setListeMessages(data.messages);
      } catch (error) {
        console.error('Error:', error.response);
      }finally{
        setLoading(false);
      }
    }
    fetchUsers();
    fetchMessages();
  }, [props.user, navigate,isSettingTitle,isPrivate]);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  async function handleKeyPress(e) {
    if (e.key === 'Enter') {
      if (isSettingTitle) {
        // L'utilisateur appuie sur "Enter" lorsqu'il saisit le titre
        if (title.length > 0) {
          setIsSettingTitle(false); // Passer à la saisie du message
        }
      } else {
        // L'utilisateur appuie sur "Enter" lorsqu'il saisit le message
        if (message.length > 0) {
          await api.postMessage({ title, id_Parent: "0", message, privacy:isPrivate });
          setTitle('');
          setMessage('');
    
          setIsSettingTitle(true); // Revenir à la saisie du titre
        }
      }
    }
  }

  return (
    <div className={styles.globalDiv}>
      <Header setData={props.setData} shearchBar={true} />
      <div className={styles.mainSection}>
        <div className={styles.globalDiv2}>
          <input type="text" placeholder={isSettingTitle ? "New message ? Chose a title for your message" : "What is your message ?"} value={isSettingTitle ? title : message} onChange={(e) => { isSettingTitle ? setTitle(e.target.value) : setMessage(e.target.value) }} onKeyPress={handleKeyPress} className={styles.myLabel}/>
          <hr align="center" width="75%" />
          <div className={styles.center}>
            <Messages showAuthor={true} listeMessages={listeMessages} />
          </div>
        </div>
        <div className={styles.infoPanel}>
          <p>Info panel</p>
          <p>Nombre d'utilisateur :{nbUser}</p>
          <p>Nombre de message : {nbMessage} </p>
        </div>
      </div>
      {
        userType === "admin" ? <button onClick={() => setIsPrivate(isPrivate === "public" ? "private" : "public")} className={styles.privacyBtn}> {isPrivate}</button> : null 
      }
      </div>
  );
}

export default Home;


