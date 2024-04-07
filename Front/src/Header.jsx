import React, { useState, useEffect } from 'react';
import Label from './StylisedLabel.jsx';
import { Link } from "react-router-dom";
import Menu from './MenuRoulant.jsx';
import PrivateChat from './PrivateChat.jsx';

import styles from './Css/Header.module.css';

function Header(props) {
  const [search, setSearch] = useState("");
  const [showChat, setShowChat] = useState(true); // To control chat display
  return (
    <>
      <div className={styles.Header}>
        <Link to="/">
          <img className={styles.logoSorbonne} src="/logoSorbonneUniversite.png" />
        </Link>
        {props.shearchBar && (
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
};
/*
<button onClick={() => setShowChat(!showChat)}>Chat</button>
{showChat && <PrivateChat userId={"userID"} peerId={"peerID"} />}

*/
export default Header;

