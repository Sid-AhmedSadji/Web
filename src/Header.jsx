import React from 'react';
import Label from './StylisedLabel.jsx'
import {Link} from "react-router-dom";
import { useEffect,useState } from 'react'
import "./App.css"
import "./Header.css"


function Header (){

  const[recherche,setRecherche] = useState("")
  useEffect(() =>{
    console.log(recherche);
  },[recherche]);

  return(
    <div className="Header">
      <img className="logoSorbonne" src="/public/logoSorbonneUniversite.png" height="50vh" />
      <div>
        <Label value={recherche} setValue={setRecherche} />
      </div>
      <p> from </p>
      <input className="dateIcon" type="date"/>
      <p> to </p>
      <input className="dateIcon" type="date"/>
      <div className="Link">
        <Link to="/SignUp">Sign Up</Link>
        <Link to="/LogIn">Log In</Link>
      </div>
    </div>
  );
};

export default Header ;
