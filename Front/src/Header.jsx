import React, { useState, useEffect } from 'react';
import Label from './StylisedLabel.jsx';
import { Link } from "react-router-dom"; //Permet aux utilisateurs de retourner à la page d'accueil en cliquant sur le logo de l'université.
import Menu from './MenuRoulant.jsx';
import GlobalChat from './GlobalChat.jsx';

import styles from './Css/Header.module.css';

function Header(props) {
  //const [search, setSearch] = useState("");  //État pour la recherche (non utilisé dans le code actuel)
  const [showChat, setShowChat] = useState(false); //État pour contrôler l'affichage du chat

  return (
    <>
      <div className={styles.Header}>
        <Link to="/">
          <img className={styles.logoSorbonne} src="/logoSorbonneUniversite.png" alt="Logo Sorbonne Université" />
        </Link>
        {props.searchBar && (
          <div>
            <Label value={props.filter} setValue={props.setFilter} />
            <div className={styles.dateDiv}>
              <p>from : </p>
              <input 
                className={styles.dateIcon} 
                type="date" 
                onChange={(event) => props.setFilterBeginning(event.target.value)}
              />
            </div>
            <div className={styles.dateDiv}>
              <p>to :</p>
              <input 
                className={styles.dateIcon} 
                type="date" 
                onChange={(event) => props.setFilterEnd(event.target.value)}
              />
            </div>
          </div>
        )}
        <div className={styles.menuContainer}>
          <Menu type={props.user} />
          {/* Bouton pour basculer l'affichage du chat */}
          <button onClick={() => setShowChat(!showChat)} className={styles.chatButton}>
            Chat
          </button>
        </div>
      </div>
      <div className={styles.divider}>
        <hr align="center" width="75%" />
      </div>
      {/* Affichage conditionnel du composant GlobalChat en fonction de l'état showChat */}
      {showChat && <GlobalChat userId={props.userId} />}
    </>
  );
}

export default Header;
