import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react'; // Correct import statement for useState
import styles from "./Css/Login.module.css"; 
import toast, { Toaster } from 'react-hot-toast'; 
import api from './ApiCalls';

function Login(props) {
  const [pseudo, setPseudo] = useState(""); 
  const [password, setPassword] = useState(""); 

  async function getUser() {
    try {
      if (pseudo === "" || password === "") { 
        toast.error("Please fill all fields"); 
        return;
      }
      const user = await api.getUser({ login: pseudo, id: null, type: null }); 
      if (user[0].type !== "admin" && user[0].type !== "user") { 
        toast.error("Please wait for the account confirmation");
      } else {
        const response = await api.login({ login: pseudo, password: password });
        toast.success("Login successful");
        props.setUser(response.id); 
      }
    } catch (error) {
      toast.error(`Login failed: ${error.response.data.message}`);
      console.error('Error:', error);
    }
  }

  return (
    <div className={styles.container}>
      <Toaster />
      <div className={styles.box}>
        <div className={styles.boxLogin} id="login">
          <div className={styles.topHeader}>
            <h3>Welcome back!</h3>
            <small>We are happy to see you again.</small>
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
