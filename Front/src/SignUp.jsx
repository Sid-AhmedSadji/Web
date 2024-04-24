import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import api from './ApiCalls';
import styles from './Css/Login.module.css';

//Fonctions pour afficher différents types de notifications
const errorPassword = () => {
  toast.error('Passwords do not match or fields are empty');
};

const signUpOk = () => {
  toast.success('Your account has been created');
};

const toLogIn = () => {
  toast.loading('Please wait...');
}

//toast speudo already used
const errorPseudo = () => { //On ne l'utilise pas ?
  toast.error('Username already in use');
}

//Fonction asynchrone pour enregistrer un nouvel utilisateur
async function postUser(props) {
  const { pseudo, password, confirmPassword, firstname, lastname } = props;

  //Vérification des champs requis
  if (pseudo === "" || password === "" || confirmPassword === "" || firstname === "" || lastname === "") {
    //le toast en anglais 
    toast.error("Please fill in all the fields");
    return false ;
  }
  if (password !== confirmPassword ) {
    errorPassword();
    return false;
  }
  try {
    //Appel API pour enregistrer l'utilisateur
    const response = await api.postUser({ pseudo, password, firstname, lastname });
    signUpOk(); //Affichage de la réussite
    return true;
  } catch (error) {
    //Retour des erreurs
    if (error.response)
      return Promise.reject(error.response.data);
    else
      return Promise.reject(error.message);
  }
}

function SignUp() {
  //Déclaration des états pour les champs du formulaire
  const [pseudo, setPseudo] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [boolean, setBoolean] = useState(true);
  const navigate = useNavigate();

  //Gestionnaire pour l'inscription
  const handleSignUp = async () => {

    //await postUser(...) : Cette fonction est appelée avec les détails de l'utilisateur (pseudo, prénom, nom, mot de passe, confirmation du mot de passe). Elle retourne true si l'utilisateur a été créé avec succès, sinon false.
    //setTimeout(() => {toLogIn()}, 1000) : Si postUser retourne true, un timeout est défini pour déclencher après 1 seconde, appelant la fonction toLogIn(). Cette fonction affiche un toast indiquant que l'utilisateur doit attendre ("Please wait...").
    //setTimeout(() => {toast.dismiss(); navigate('/')}, 6000) : Un second timeout est défini pour déclencher 6 secondes après que toLogIn() a été appelé. Ce timeout ferme tous les toasts affichés et navigue vers la page principale '/'
    toast.promise(
      postUser({ pseudo, password, confirmPassword, lastname, firstname }),
      {
        loading: 'Please wait...',
        success: 'Registration successful!',
        error: (err) => `Registration error: ${err}`
      }
    ).then(() => setTimeout(() => {navigate('/')}, 2000)); //Si la promesse est résolue, un timeout est défini pour déclencher après 1 seconde, naviguant vers la page principale '/'
    //Phase première de l'inscription boolean = true

    setBoolean(true);
    setPseudo('');
    setFirstname('');
    setLastname('');
    //Phase seconde de l'inscription boolean = false
    setPassword('');
    setConfirmPassword('');
  };



  return (
    <div className={styles.container}>
      <Toaster />
      <div className={styles.box}>
        <div className={styles.boxLogin} id="login">
          <div className={styles.topHeader}>
            <h3>Sign Up, Now!</h3>
            <small>We are happy to have you with us.</small>
          </div>
          <div className={styles.inputGroup}>

            {
              boolean ? 
                <>
                  <div className={styles.inputField}>
                    <input
                      type="text"
                      className={styles.inputBox}
                      placeholder="Username"
                      value={pseudo}
                      onChange={(e) => setPseudo(e.target.value)}
                      required
                    />
                  </div>
                  <div className={styles.inputField}>
                    <input
                      type="text"
                      className={styles.inputBox}
                      placeholder="Firstname"
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                      required
                    />
                  </div>
                  <div className={styles.inputField}>
                    <input
                      type="text"
                      className={styles.inputBox}
                      placeholder="Lastname"
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                      required
                    />
                  </div>
                </> :
                <>
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
                    <input
                      type="password"
                      className={styles.inputBox}
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </>

            }
            
            <div className={styles.inputField}>
              <button className={styles.inputSubmit} onClick={boolean ? () => setBoolean(false) : handleSignUp}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
        <div className={styles.switch}>
          <Link to="/" >Log In?</Link>
          <p className={styles.active}>Sign Up?</p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

