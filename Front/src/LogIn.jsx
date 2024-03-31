import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import styles from "./Css/Login.module.css";
import rgbStyle from "./Css/RGB.module.css";
import toast, { Toaster } from 'react-hot-toast';
import api from './ApiCalls';
import axios from 'axios';

function Login(props) {
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function checkSession () {
    const userId = await api.checkSession();
      if (userId) {
        props.setUser(userId);
      }
  };

  async function getUser() {
    try {
      if (pseudo === "" || password === "") {
        toast.error("Veuillez remplir tous les champs");
        return;
      }
      const islogged = await api.login({ login: pseudo, password: password });
      if (!islogged) {
        toast.error("Échec de la connexion");
        setPassword("");

        return ;
      }
      toast.success("Connexion réussie");
      await checkSession(); 
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
