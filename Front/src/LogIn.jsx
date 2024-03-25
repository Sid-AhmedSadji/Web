  import {Link, useNavigate, useLocation} from "react-router-dom";
  import { useEffect, useState } from 'react'

  import styles from "./Css/Login.module.css"
  import rgbStyle from "./Css/RGB.module.css"

  async function getUser(setData,pseudo,password) {
    try {
      const response = await fetch("http://localhost:8000/api/user/"+pseudo+"/"+password);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données');
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Erreur:', error);
    }
  }
  
  function Login (user) {

    const [pseudo,setPseudo] = useState("")
    const [password,setPassword] = useState("") ;
    let navigate = useNavigate();
    let location = useLocation();

    useEffect(() => {
      (user.user !== -1) && navigate( "/");
    },[user, navigate, location.state]);
    

    return (
      <div className={styles.center}>
        <div className={rgbStyle.rgb}>
          <div className={styles.mainsectionlogin}>
            <h1 className={styles.h2} id='titre'>Connection</h1>
            <input type="text" placeholder="Username" className={styles.myLabel} value={pseudo} onChange={(e)=>setPseudo(e.target.value)}/>
            <input type="password" placeholder="Password" className={styles.myLabel} value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <div className={styles.sectionButtons}>
              <button className={rgbStyle.button85} onClick={ ()=>{ getUser(user.setData,pseudo,password)}}>Login</button>
              <button className={rgbStyle.button85} onClick={()=>{setPseudo("");setPassword("");}} >Cancel</button>
            </div>
            <Link className={styles.customlink} to="/SignUp">Sign up ?</Link>
          </div>
        </div>
      </div>

    );
}

  export default Login ;
