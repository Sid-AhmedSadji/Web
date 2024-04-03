import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header.jsx';
import MainDiv from './AfficheMessage.jsx'; // Assurez-vous que le nom commence par une majuscule
import { useState, useEffect } from 'react';
import api from './ApiCalls.js';
import styles from './Css/AfficheMessage.module.css';
import toast, { Toaster } from 'react-hot-toast';


const MessageDetails = () => {
  const idMessage  = useParams().id; // Renommer id en idMessage
  const [idUser, setIdUser] = useState(null); // Renommer id en idUser
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [isSettingTitle, setIsSettingTitle] = useState(true);
  const [mainDivKey, setMainDivKey] = useState(0); // Clé pour forcer le re-render du composant MainDiv
  let navigate = useNavigate();


  useEffect(() => {
  
    async function fetchUser() {
      try {
        const id = await api.checkSession();
        setIdUser(id.userid);
        const data = await api.getUser({ login: null, id: id.userid, type: null });
        if (data) {
          setUser(data[0]);
        }
      } catch (error) {
        setUser(null);
        console.error('Error:', error.response);
      }finally {
        setLoading(false);
      }
    }
  
    async function fetchMessage() {
      try {
        const data = await api.getMessages({ id: idMessage });
        setTopic(data.messages[0]);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    async function checkSession () {
      try {
        console.log('Checking session...');
        const response = await api.checkSession();
        fetchUser();
        fetchMessage();
      } catch (error) {
        console.error("Error", error.response.data.message);
        navigate ("/");
      }
    };

    checkSession();
  

  
  }, [idMessage]); // Déclencher cet effet chaque fois que l'ID change
  
  async function handleKeyPress(e) {
    if (e.key === 'Enter') {
      if (isSettingTitle) {
        if (title.length > 0) {
          setIsSettingTitle(false);
        }
      } else {
        if (message.length > 0) {
          try {
            await api.postMessage({ title, id_Parent: idMessage, message, privacy: topic.privacy })
            setMainDivKey(mainDivKey + 1);
          }catch (error) {
            setTitle('');
            setMessage('');
            setIsSettingTitle(true);
            toast.error('Error:'+ error.response.data.message);
            console.error('Error:', error.response.data.message);
          }
        }
      }
    }
  }
  

  return (
    <div style={{ width: "100%" }}>
      <Toaster />
      <Header />
      <div style={{ width: "100%" }}>
        <MainDiv key={mainDivKey} id={idMessage} topic={topic} /> 
      </div>
      {!loading &&
        <>
          <input
            type="text"
            placeholder={isSettingTitle ? "Nouveau message ? Choisissez un titre pour votre message" : "Quel est votre message ?"}
            value={isSettingTitle ? title : message}
            onChange={(e) => { isSettingTitle ? setTitle(e.target.value) : setMessage(e.target.value) }}
            onKeyPress={handleKeyPress}
            className={styles.myLabel}
          />
        </>
      }
    </div>
  );
};

export default MessageDetails;


