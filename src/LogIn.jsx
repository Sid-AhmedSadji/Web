  import { useState } from 'react'

  import styles from "./Css/Login.module.css"
  import rgbStyle from "./Css/RGB.module.css"

  function Login ({ setPage}) {

    const [pseudo,setPseudo] = useState("")
    const [password,setPassword] = useState("") ;

    return (
      <div className={styles.center}>
        <div className={rgbStyle.rgb}>
          <div className={styles.mainsectionlogin}>
            <h1 className={styles.h2} id='titre'>Connection</h1>
            <input type="text" placeholder="Username" className={styles.myLabel} value={pseudo} onChange={(e)=>setPseudo(e.target.value)}/>
            <input type="password" placeholder="Password" className={styles.myLabel} value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <div className={styles.sectionButtons}>
              <button className={rgbStyle.button85}>Login</button>
              <button className={rgbStyle.button85} onClick={()=>{setPseudo("");setPassword("");}} >Cancel</button>
            </div>
	      <button className={ styles.linkBtn } onClick={ ()=>setPage("Signup") }> Click on me </button>
          </div>
        </div>
      </div>

    );
}

  export default Login ;
