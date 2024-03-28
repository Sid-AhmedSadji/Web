import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import styles from "./Css/Login.module.css";
import rgbStyle from "./Css/RGB.module.css";
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

function Login(props) {
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function checkSession () {
    try {
      /*
      const response = await axios.get('http://localhost:4000/api/session', {
        method: 'GET',
        credentials: 'include'
      });
      */

      const response = await fetch('http://localhost:4000/api/session', {
        method: 'GET',
        credentials: 'include'
      })
      if (response.status===200) {
        const data = await response.json();
        props.setUser(data.userid);
        console.log("setUser : ", props.user);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
    }
  };

  async function getUser() {
    try {
      if (pseudo === "" || password === "") {
        toast.error("Veuillez remplir tous les champs");
        return;
      }
      const response = await fetch('http://localhost:4000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
          credentials: "include",
          body: JSON.stringify({
            login: pseudo,
            password: password,
          })
      });
      if (!response) {
        toast.error("Échec de la connexion");
        return ;
      }
      const data = await response.json();
      if ( data.status !== 200 ) {
        toast.error(data.message);
        setPassword("");
      } else {
        toast.success("Connexion réussie"); 
       await checkSession();
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast.error("Échec de la connexion");
    }
  }

  return (
    <div className={styles.center}>
      <Toaster />
      <div className={rgbStyle.rgb}>
        <div className={styles.mainsectionlogin}>
          <h1 className={styles.h2} id='titre'>Connection</h1>
          <input type="text" placeholder="Username" className={styles.myLabel} value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
          <input type="password" placeholder="Password" className={styles.myLabel} value={password} onChange={(e) => setPassword(e.target.value)} />
          <div className={styles.sectionButtons}>
            <button className={rgbStyle.button85} onClick={getUser}>Login</button>
            <button className={rgbStyle.button85} onClick={() => { setPseudo(""); setPassword(""); }} >Cancel</button>
          </div>
          <Link className={styles.customlink} to="/SignUp">Sign up ?</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
