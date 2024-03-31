import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header.jsx';
import MainDiv from './AfficheMessage.jsx'; // Assurez-vous que le nom commence par une majuscule
import { useState, useEffect } from 'react';
import api from './ApiCalls.js';
import styles from './Css/AfficheMessage.module.css';

const MessageDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [isSettingTitle, setIsSettingTitle] = useState(true);
  const [mainDivKey, setMainDivKey] = useState(0); // Clé pour forcer le re-render du composant MainDiv
  let navigate = useNavigate();

  useEffect(() => {
    // Récupérer les données de l'utilisateur depuis l'API
    api.getUser(id, null)
      .then(userFromApi => {
        setUser(userFromApi[0]);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, [id]); // Déclencher cet effet chaque fois que l'ID change

  async function handleKeyPress(e) {
    if (e.key === 'Enter') {
      if (isSettingTitle) {
        if (title.length > 0) {
          setIsSettingTitle(false);
        }
      } else {
        if (message.length > 0) {
          // Envoyer le nouveau message à l'API
          await api.postMessage({ title, id_Parent: id.toString(), message });
          // Réinitialiser les champs de saisie
          setTitle('');
          setMessage('');
          setIsSettingTitle(true);
          // Actualiser les données du composant MainDiv en changeant sa clé
          setMainDivKey(prevKey => prevKey + 1);
        }
      }
    }
  }

  return (
    <div style={{ width: "100%" }}>
      <Header />
      <div style={{ width: "100%" }}>
        <MainDiv key={mainDivKey} id={id} /> {/* Utilisez la clé pour forcer le re-render */}
      </div>
      {!loading &&
        <>
          <input
            type="text"
            placeholder={isSettingTitle ? "New message ? Choose a title for your message" : "What is your message ?"}
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
