import React, { useState, useEffect } from 'react';
import Label from './StylisedLabel.jsx';
import { Link } from "react-router-dom"; //Permet aux utilisateurs de retourner à la page d'accueil en cliquant sur le logo de l'université.
import Menu from './MenuRoulant.jsx';
import GlobalChat from './GlobalChat.jsx';
import { HiChatAlt2 } from "react-icons/hi";


import styles from './Css/Header.module.css';

function Header(props) {
  const [showChat, setShowChat] = useState(true); //État pour contrôler l'affichage du chat

  // Fonction de callback pour changer l'état de l'affichage du chat
  const toggleChat = () => {
    setShowChat(!showChat);
  };

  return (
    <>
      <div className={styles.Header}>
        <Link to="/">
          <img className={styles.logoSorbonne} src="/logoSorbonneUniversite.png" />
        </Link>
        {props.searchBar && (
          <>
            <div>
              <Label value={props.filter} setValue={props.setFilter} />
            </div>
            <div className={styles.dateDiv}>
              <p>from : </p>
              <input className={styles.dateIcon} type="date" onChange={(event)=>{props.setFilterBegging(event.target.value)}}/>
            </div>
            <div className={styles.dateDiv}>
              <p>to :</p>
              <input className={styles.dateIcon} type="date" onChange={(event)=>{props.setFilterEnd(event.target.value)}}/>
            </div>

            {/* Bouton pour basculer l'affichage du chat */}
            {showChat ? 
              <button onClick={toggleChat} className={styles.chatButton}> <HiChatAlt2 /> </button> :
              <GlobalChat userId={props.idUser} setShowChat={toggleChat}/> 
            }

          </>
        )}

        <div style={{ width: "50px" }}>
          <Menu type={props.user} />
        </div>

      </div>
      
      <div style={{ padding: "15px 0px" }}>
        <hr align="center" width="75%" />
      </div>
    </>
  );
}

export default Header;
