import { Link, useNavigate } from "react-router-dom"; //Importe Link pour la navigation et useNavigate pour la redirection programmée
import useState from 'react'; //Importe useState pour la gestion de l'état local, useEffect pour les effets de bord
import styles from "./Css/Login.module.css"; 
import toast, { Toaster } from 'react-hot-toast'; //Importe toast pour afficher des notifications
import api from './ApiCalls'; //Importe les appels API définis dans ApiCalls.js

function Login(props) {
  const [pseudo, setPseudo] = useState(""); //Gère l'état pour le pseudonyme de l'utilisateur
  const [password, setPassword] = useState(""); //Gère l'état pour le mot de passe


  
  //Fonction asynchrone pour récupérer les utilisateurs
  async function getUser() {
    try {
      if (pseudo === "" || password === "") { 
        toast.error("Please fill all fields"); //Affiche une notification d'erreur
        return;
      }
      const user = await api.getUser({ login: pseudo, id: null, type: null }); //Tente de récupérer l'utilisateur
      if (user[0].type !== "admin" && user[0].type !== "user") { //Vérifie le type de l'utilisateur
        toast.error("Please wait for the account confirmation");
      } else {
        const response = await api.login({ login: pseudo, password: password });
        toast.success("Login successful");
        props.setUser(response.id); //Met à jour l'état global de l'utilisateur
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

