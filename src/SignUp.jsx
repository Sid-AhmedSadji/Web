import { useState } from 'react'
import {Link} from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import reactLogo from './assets/react.svg'

import styles from "./Css/Login.module.css"
import rgbStyle from "./Css/RGB.module.css"

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
    <div className={styles.center}>
      <div className={rgbStyle.rgb}>
        <div className={styles.mainsectionlogin}>
          <h1 id='titre'>Register Account</h1>
          <input type="text" value={pseudo} onChange={(e)=>setPseudo(e.target.value)} placeholder="Username" className={styles.myLabel}/>
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}  placeholder="Password" className={styles.myLabel}/>
          <input type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}  placeholder="Confirm Password" className={styles.myLabel}/>
          <div className={styles.sectionButtons}>
          <button className={rgbStyle.button85} onClick={errorPassword}>Register</button>
          <Toaster />
          <button className={rgbStyle.button85} onClick={()=>{ setPseudo("");setPassword("");setConfirmPassword("")}}>Cancel</button>
          </div>
          <Link className={styles.customlink} to="/LogIn">Log In ?</Link>
        </div>
      </div>
     </div>
  );

}

export default SignUp
