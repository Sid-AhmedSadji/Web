import { useState } from 'react'
import {Link} from "react-router-dom";
import reactLogo from './assets/react.svg'
import './App.css'


function SignUp () {

  const [password,setPassword] = useState() ;
  const [confirmPassword,setConfirmPassword] = useState() ;



  return (
    <mainsectionsignup>
      <h1 id='titre'>Inscription</h1>
      <input type="text" placeholder="Pseudo" className="myLabel"/>
      <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}  placeholder="Mot de passe" className="myLabel"/>
      <input type="password" value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}}  placeholder="Confirmer Mot de passe" className="myLabel"/>
      <sectionButtons>
        <input type="button" value="Sign Up" className="myButton"/>
        <input type="button" value="Cancel" className="myButton"/>
      </sectionButtons>
      <Link to="/LogIn">S'Inscrire ?</Link>
    </mainsectionsignup>
  );

}

export default SignUp
