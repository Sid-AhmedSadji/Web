import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import api from './ApiCalls';
import styles from './Css/Login.module.css';

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
const errorPseudo = () => {
  toast.error('Username already in use');
}

async function postUser(props) {
  const { pseudo, password, confirmPassword, firstname, lastname } = props;

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
    const response = await api.postUser({ pseudo, password, firstname, lastname });
    signUpOk();
    return true;
  } catch (error) {
    toast.error('Error: ' + error.response.data);
    console.error('Error:', error.response.data);
    return false;
  }
}

function SignUp() {
  const [pseudo, setPseudo] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [boolean, setBoolean] = useState(true);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    await postUser({ pseudo, password, confirmPassword, lastname, firstname } ) && setTimeout(() => {toLogIn()}, 1000) && setTimeout(() => {toast.dismiss();navigate('/')}, 6000);
    setBoolean(true);
    setPseudo('');
    setFirstname('');
    setLastname('');
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
