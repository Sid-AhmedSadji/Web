import React from 'react';
import Label from './StylisedLabel.jsx'
import {Link} from "react-router-dom";
import { useEffect,useState } from 'react'

import styles from './Css/Header.module.css'


function Header (){

  const[recherche,setRecherche] = useState("")
  useEffect(() =>{
    console.log(recherche);
  },[recherche]);

  return(
    <div className={styles.Header}>
      <Link to="/">
        <img className={styles.logoSorbonne} src="/logoSorbonneUniversite.png" height="50vh" />
        </Link>
	<div>
        <Label value={recherche} setValue={setRecherche} />
      </div>
      <p> from </p>
      <input className={styles.dateIcon} type="date"/>
      <p> to </p>
      <input className={styles.dateIcon} type="date"/>
      <div className={styles.Link}>
        <Link to="/SignUp">Sign Up</Link>
        <Link to="/LogIn">Log In</Link>
      </div>
    </div>
  );
};

export default Header ;