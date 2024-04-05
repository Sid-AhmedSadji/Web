import React, { useState, useEffect } from 'react';
import Label from './StylisedLabel.jsx';
import { Link } from "react-router-dom";
import Menu from './MenuRoulant.jsx';
import PrivateChat from './PrivateChat.jsx';

import styles from './Css/Header.module.css';

function Header(props) {
  const [recherche, setRecherche] = useState("");
  const [showChat, setShowChat] = useState(false); // Pour contrôler l'affichage du chat

  useEffect(() => {
    console.log(recherche);
  }, [recherche]);

  return (
    <>
      <div className={styles.Header}>
        <Link to="/">
          <img className={styles.logoSorbonne} src="/logoSorbonneUniversite.png" />
        </Link>
        {props.searchBar && (
          <>
            <div>
              <Label value={recherche} setValue={setRecherche} />
            </div>
            <div className={styles.dateDiv}>
              <p>from : </p>
              <input className={styles.dateIcon} type="date" />
            </div>
            <div className={styles.dateDiv}>
              <p>to :</p>
              <input className={styles.dateIcon} type="date" />
            </div>
          </>
        )}
        <button onClick={() => setShowChat(!showChat)}>Chat</button>
        <div style={{ width: "50px" }}>
          <Menu setData={props.setData} />
        </div>
      </div>
      {showChat && <PrivateChat userId={"userID"} peerId={"peerID"} />}
      <div style={{ padding: "15px 0px" }}>
        <hr align="center" width="75%" />
      </div>
    </>
  );
};

export default Header;
