import React from 'react';
import Label from './StylisedLabel.jsx'
import { useEffect,useState } from 'react'

import styles from './Css/Header.module.css'


function Header ( { setPage } ){

  const[recherche,setRecherche] = useState("")
  useEffect(() =>{
    console.log(recherche);
  },[recherche]);

  return(
    <div className={styles.Header}>
	  <button className={ styles.btnImage } onClick={ ()=>setPage('Home') }>
          <img className={styles.logoSorbonne} src="/public/logoSorbonneUniversite.png" height="50vh" />
	  </button>
	<div>
        <Label value={recherche} setValue={setRecherche} />
      </div>
      <p> from </p>
      <input className={styles.dateIcon} type="date"/>
      <p> to </p>
      <input className={styles.dateIcon} type="date"/>
      <div className={styles.Link}>
      </div>
    </div>
  );
};

export default Header ;
