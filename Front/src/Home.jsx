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
  let navigate = useNavigate();


  useEffect(() => {
    if (props.user === null) {
      navigate("/Login");
    }

    async function fetchMessages() {
      try {
        const data = await api.getMessages();
        if (!data) {
          throw new Error('Failed to get messages');
        }
        setListeMessages(data);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    }
    fetchMessages();
  }, [props.user, navigate,isSettingTitle]);
  
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
          await api.postMessage({ title, id_Parent: "0", message });
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
          <p>Nombre d'utilisateur : 0</p>
          <p>Nombre de message : 0 </p>
        </div>
      </div>
    </div>
  );
}

export default Home;

