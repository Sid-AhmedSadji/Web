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



  async function getUser() {
    try {
      if (pseudo === "" || password === "") {
        toast.error("Please fill all the fields");
        return;
      }
      const user = await api.getUser({ login: pseudo, id: null, type: null });
      if (user[0].type !== "admin" && user[0].type !== "user") {
        toast.error("Please wait for the account confirmation");
      }else {
        const response = await api.login({ login: pseudo, password: password });
        toast.success("Connexion success");
        props.setUser(response.id);
      }
    } catch (error) {
      toast.error("Connexion failed: " + error.response.message);
      console.error('Error:', error);
    }
  }

  return (
    <div className={styles.center}>
      <Toaster />
      <div className={rgbStyle.rgb}>
        <div className={styles.mainsectionlogin}>
          <h1 className={styles.h2} id='titre'>Connexion</h1>
          <input type="text" placeholder="Username" className={styles.myLabel} value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
          <input type="password" placeholder="Password" className={styles.myLabel} value={password} onChange={(e) => setPassword(e.target.value)} />
          <div className={styles.sectionButtons}>
            <button className={rgbStyle.button85} onClick={getUser}>Connexion</button>
            <button className={rgbStyle.button85} onClick={() => { setPseudo(""); setPassword(""); }} >Annuler</button>
          </div>
          <Link className={styles.customlink} to="/SignUp">S'inscrire ?</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;