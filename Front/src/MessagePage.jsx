import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header.jsx';
import MainDiv from './AfficheMessage.jsx'; // Ensure component name starts with a capital letter
import { useState, useEffect } from 'react';
import api from './ApiCalls.js';
import styles from './Css/AfficheMessage.module.css';
import toast, { Toaster } from 'react-hot-toast';


const MessageDetails = () => {
  const idMessage  = useParams().id; // Rename `id` to `idMessage` | (Récupère l'ID du message de l'URL)
  const [idUser, setIdUser] = useState(null); // Rename `id` to `idUser` | (État pour l'ID de l'utilisateur connecté)
  const [loading, setLoading] = useState(true); //État pour l'affichage du chargement
  const [user, setUser] = useState(null); //État pour stocker les informations de l'utilisateur
  const [title, setTitle] = useState(""); //État pour le titre d'une réponse
  const [topic, setTopic] = useState("");  //État pour stocker les détails du message principal
  const [message, setMessage] = useState(""); //État pour le contenu d'une réponse
  const [isSettingTitle, setIsSettingTitle] = useState(true); //Booléen pour basculer entre entrer un titre et un message
  const [mainDivKey, setMainDivKey] = useState(0); // Key to force MainDiv re-render
  let navigate = useNavigate();


  useEffect(() => {
  
    async function fetchUser() { //Fonction pour récupérer les détails de l'utilisateur
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
        setLoading(false); //Termine le chargement
      }
    }
  
    async function fetchMessage() { //Fonction pour récupérer les détails du message principal
      try {
        const data = await api.getMessages({ id: idMessage });
        setTopic(data.messages[0]); //Stocke les détails du message principal
      } catch (error) {
        console.error('Error:', error);
      }
    }

    async function checkSession () { //Fonction pour vérifier la session et récupérer les données
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
  
  }, [idMessage]); // Trigger this effect each time the ID changes
  
  
  async function handleKeyPress(e) { //Gère la saisie du texte pour créer une nouvelle réponse
    if (e.key === 'Enter') {
      if (isSettingTitle) {
        if (title.length > 0) {
          setIsSettingTitle(false); //Passe à la saisie du message
        }
      } else {
        if (message.length > 0) {
          try {
            await api.postMessage({ title, id_Parent: idMessage, message, privacy: topic.privacy })
            setMainDivKey(mainDivKey + 1); //Incrémente la clé pour re-rendre MainDiv
          }catch (error) {
            setTitle('');
            setMessage('');
            setIsSettingTitle(true);
            toast.error('Error:'+ error.response.data.message);
            console.error('Error:', error.response.data.message);
          }finally{
            setTitle('');
            setMessage('');
            setIsSettingTitle(true);
          }
        }
      }
    }
  }
  
  if (loading) {
    return <div>Loading...</div>;
  }

  

  return (
    <div className={ styles.mainDiv }>
      <Toaster />
      <Header user={user.type} />
      <div className={styles.msgDiv}>
        <MainDiv key={mainDivKey} id={idMessage} topic={topic} userid={idUser}/> 
      </div>
      {!loading &&
        <>
          <input
            type="text"
            placeholder={isSettingTitle ? "Create a new message? Choose a title for your message" : "What is your message?"}
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

//Affiche une page de message
