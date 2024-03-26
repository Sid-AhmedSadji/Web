import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import styles from "./Css/Login.module.css";
import rgbStyle from "./Css/RGB.module.css";
import toast, { Toaster } from 'react-hot-toast';

function Login(props) {
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/user/${pseudo}/${password}`);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données');
      }
      const data = await response.json();
      if (data.type === "0") {
        toast.error("Utilisateur inconnu");
        setPassword("");
        props.setData(-1);
      } else {
        props.setData(data.id);
        navigate("/");
        toast.success("Connexion reussie"); 
        createCookie(pseudo,password,data.id);
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast.error("Impossible de vous connecter");
    }
  }

  const createCookie = async (pseudo,password,id) => {
    try {
      const cookie = await fetch("http://localhost:8000/api/login",{
        method: 'POST',
        //envoie json 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({pseudo,password}),
        credentials: 'include',
      });
        if (!cookie.ok) {
          throw new Error('Erreur lors de la création de la session');
        } else {
          const myCookie = await cookie.json();
          console.log("Cookie mis à jour"); 
          toast.success("Connexion reussie");
    }
    } catch (error) {
      // Gère les erreurs
      console.error('Erreur:', error);
    }
  };

  //use effect verrifie user === null sinon renoie vers home
  useEffect(() => {
    if (props.user !== null) {
      navigate("/");
    }
  })

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
