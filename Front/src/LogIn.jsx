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
    <div className={styles.container}>
      <Toaster />
      <div className={styles.box}>
        <div className={styles.boxLogin} id="login">
          <div className={styles.topHeader}>
            <h3>Hello, Again!</h3>
            <small>We are happy to have you back.</small>
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.inputField}>
              <input
                type="text"
                className={styles.inputBox}
                placeholder="Login"
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputField}>
              <input
                type="password"
                className={styles.inputBox}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputField}>
              <button className={styles.inputSubmit} onClick={getUser}>
                Sign In
              </button>
            </div>
          </div>
        </div>
        <div className={styles.switch}>
          <p className={styles.active}>Log In?</p>
          <Link to="/SignUp">Sign Up?</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;