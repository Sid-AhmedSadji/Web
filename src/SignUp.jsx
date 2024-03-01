import { useEffect, useState } from 'react'
import {Link} from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import reactLogo from './assets/react.svg'
import './App.css'


function SignUp () {

  const [password,setPassword] = useState("") ;
  const [confirmPassword,setConfirmPassword] = useState("") ;

  const errorPassword = ()=> toast("Password doesn't match") ;

  return (
    <div className='center'>
      <div className="mainsectionsignup">
        <h1 id='titre'>Register Account</h1>
        <input type="text" placeholder="Username" className="myLabel"/>
        <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}  placeholder="Password" className="myLabel"/>
        <input type="password" value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}}  placeholder="Confirm Password" className="myLabel"/>
        <div className="sectionButtons">
        <button className='button-85' onClick={errorPassword}>Register</button>
        <Toaster />
        <input type="button" value="Cancel" className="myButton"/>
        </div>
        <Link to="/LogIn">S'Inscrire ?</Link>
      </div>
     </div>
  );

}

export default SignUp
