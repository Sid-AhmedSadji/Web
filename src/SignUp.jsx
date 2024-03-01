import { useState } from 'react'
import {Link} from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import reactLogo from './assets/react.svg'
import './App.css'


function SignUp () {

  const [pseudo,setPseudo] = useState("") ;
  const [password,setPassword] = useState("") ;
  const [confirmPassword,setConfirmPassword] = useState("") ;

  const errorPassword = ()=> {
    toast.error("Password doesn't match")
    setPassword("")
    setConfirmPassword("")
  };

  return (
    <div className='center'>
      <div className='rgb'>
        <div className="mainsectionsignup">
          <h1 id='titre'>Register Account</h1>
          <input type="text" value={pseudo} onChange={(e)=>setPseudo(e.target.value)} placeholder="Username" className="myLabel"/>
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}  placeholder="Password" className="myLabel"/>
          <input type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}  placeholder="Confirm Password" className="myLabel"/>
          <div className="sectionButtons">
          <button className='button-85' onClick={errorPassword}>Register</button>
          <Toaster />
          <button className='button-85' onClick={()=>{ setPseudo("");setPassword("");setConfirmPassword("")}}>Cancel</button>
          </div>
          <Link className="custom-link" to="/LogIn">Log In ?</Link>
        </div>
      </div>
     </div>
  );

}

export default SignUp
