import Header from "./Header.jsx"
import Messages from"./SectionMessages.jsx"

import styles from './Css/Home.module.css'
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Home(props) {

  const [loading, setLoading] = useState(true);
  const [listeMessages, setListeMessages] = useState([]);
  let navigate = useNavigate();


  useEffect(() => {
    if (props.user === null) {
      navigate("/Login");
    }

    async function fetchMessages() {
      try {
        const response = await fetch('http://localhost:8000/api/messages');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        const data = await response.json();

        setListeMessages(data);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    }

    fetchMessages();
  }, [props.user, navigate]);
  
  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div className={styles.globalDiv}>
      <Header setData={props.setData} />
      <hr align="center" width="75%" />
      <div className={styles.mainSection}>
        <div className={styles.globalDiv2}>
          <input type="text" placeholder="New message ?" className={styles.myLabel} />
          <hr align="center" width="75%" />
          <div className={styles.center}>
            <Messages listeMessages={listeMessages} />
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

