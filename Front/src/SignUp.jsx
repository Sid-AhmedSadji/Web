import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import styles from './Css/Login.module.css';
import rgbStyle from './Css/RGB.module.css';

const errorPassword = () => {
  toast.error("Passwords don't match or fields are empty");
};

const signUpOk = () => {
  toast.success('Your account has been created');
};

const toLogIn = () => {
  toast.loading('Please wait...');
}

//toast speudo already used
const errorPseudo = () => {
  toast.error('Pseudo already used');
}

async function postUser(pseudo, password, confirmPassword) {
  if (pseudo === "" || password === "" || confirmPassword === "") {
    //le toast en anglais 
    toast.error("Please fill in all the fields");
    return;
  }
  if (password !== confirmPassword ) {
    errorPassword();
    return false;
  }
  try {
    const response = await fetch('http://localhost:8000/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ pseudo, password })
    });
    console.log(response);
    if (response.status === 409) {
      errorPseudo();
      throw new Error('Pseudo already exists');
    }
    else if (!response.ok) {
      throw new Error('Failed to post user');
    }
    signUpOk();
    return true;
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
}

function SignUp() {
  const [pseudo, setPseudo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    await postUser(pseudo, password, confirmPassword) && setTimeout(() => {toLogIn()}, 1000) && setTimeout(() => {toast.dismiss();navigate('/LogIn')}, 6000);
  };



  return (

    <div className={styles.center}>
     
      <Toaster />

      <div className={rgbStyle.rgb}>

        <div className={styles.mainsectionlogin}>

          <h1 className={styles.h2} id="titre">Register Account</h1>
          <input type="text" value={pseudo} onChange={(e) => setPseudo(e.target.value)} placeholder="Username" className={styles.myLabel} />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className={styles.myLabel}/>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" className={styles.myLabel} />
          
          <div className={styles.sectionButtons}>

            <button className={rgbStyle.button85} onClick={handleSignUp}>Register</button>
            <button className={rgbStyle.button85} onClick={() => { setPseudo(''); setPassword(''); setConfirmPassword('');}} >Cancel</button>
         
          </div>
         
          <Link className={styles.customlink} to="/LogIn">Log In ?</Link>

        </div>

      </div>

    </div>

  );
}

export default SignUp;

