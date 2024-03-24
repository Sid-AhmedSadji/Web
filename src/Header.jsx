import React from 'react';
import Label from './StylisedLabel.jsx'
import {Link} from "react-router-dom";
import { useEffect,useState } from 'react'
import Menu from './MenuRoulant.jsx'

import styles from './Css/Header.module.css'


function Header (){

  const[recherche,setRecherche] = useState("")
  useEffect(() =>{
    console.log(recherche);
  },[recherche]);

  return(
    <div className={styles.Header}>
      <Link to="/">
        <img className={styles.logoSorbonne} src="/logoSorbonneUniversite.png" />
      </Link>
	    <div>
        <Label value={recherche} setValue={setRecherche} />
      </div>
      <div className={styles.dateDiv}>
        <p>from : </p>
       <input className={styles.dateIcon} type="date"/>
      </div>
      <div className={styles.dateDiv} >
        <p>to :</p>
       <input className={styles.dateIcon} type="date"/>
      </div>
      <div style={{width:"50px"}}>
        <Menu/>
      </div>
    </div>
  );
};

export default Header ;
