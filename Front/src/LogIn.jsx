  import {Link, useNavigate, useLocation} from "react-router-dom";
  import { useEffect, useState } from 'react'

  import styles from "./Css/Login.module.css"
  import rgbStyle from "./Css/RGB.module.css"
  import toast, { Toaster } from 'react-hot-toast';


  const errorPassword = (setPassword)=> {
    toast.error("Impossible de vous connecter")
    setPassword("")
  };

  const notUser = ()=>{
    toast.error("Vous devez que votre compte soit validé par un Admin");
    
  }

  async function getUser(setData,pseudo,password,setPassword) {
    try {
      const response = await fetch("http://localhost:8000/api/user/"+pseudo+"/"+password);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données');
      }
      const jsonData = await response.json();
      //Si  le type d'user est 0 alors setData a -1 sinon setData est l'id de l'utilisateur
      if (jsonData.type === "0") {
        notUser();
        setPassword("");
        setData(-1);
      } else {
        setData(jsonData.id);
      }
      console.log(jsonData);
    } catch (error) {
      console.error('Erreur:', error);
      errorPassword(setPassword);
    }
  }
  async function createcookies(id) {
    try {
      const response = await fetch(`http://localhost:8000/setUserCookie/${id}`);
      if (!response.ok) {
        throw new Error('Erreur lors de la création des cookies');
      }
      // Analyser la réponse JSON
      const data = await response.json();
      console.log(data); 
    } catch (error) {
      console.error('Erreur:', error);
      throw error; // Renvoyer l'erreur en cas d'échec de la requête
    }
  }
  

  
  function Login (props) {

    const [pseudo,setPseudo] = useState("")
    const [password,setPassword] = useState("") ;
    let navigate = useNavigate();
    let location = useLocation();

    useEffect(() => {
      (props.user !== -1) && createcookies(props.user) && navigate( "/");
    },[props.user, navigate, location.state]);
    

    return (
      <div className={styles.center}>
        <Toaster />
        <div className={rgbStyle.rgb}>
          <div className={styles.mainsectionlogin}>
            <h1 className={styles.h2} id='titre'>Connection</h1>
            <input type="text" placeholder="Username" className={styles.myLabel} value={pseudo} onChange={(e)=>setPseudo(e.target.value)}/>
            <input type="password" placeholder="Password" className={styles.myLabel} value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <div className={styles.sectionButtons}>
              <button className={rgbStyle.button85} onClick={ ()=>{ getUser(props.setData,pseudo,password,setPassword)}}>Login</button>
              <button className={rgbStyle.button85} onClick={()=>{setPseudo("");setPassword("");}} >Cancel</button>
            </div>
            <Link className={styles.customlink} to="/SignUp">Sign up ?</Link>
          </div>
        </div>
      </div>

    );
}

  export default Login ;
