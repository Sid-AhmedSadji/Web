import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import api from './ApiCalls';
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
  };



  return (

    <div className={styles.center}>
     
      <Toaster />

      <div className={rgbStyle.rgb}>

        <div className={styles.mainsectionlogin}>

          <h1 className={styles.h2} id="titre">Register Account</h1>
          {
            boolean ? 
              <>
                <input type="text" value={pseudo} onChange={(e) => setPseudo(e.target.value)} placeholder="Username" className={styles.myLabel} />
                <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} placeholder="Firstname" className={styles.myLabel}/>
                <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} placeholder="Lastname" className={styles.myLabel} />
              </> :
              <>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className={styles.myLabel}/>
                 <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" className={styles.myLabel} />    
              </>

          }
          <div className={styles.sectionButtons}>

            <button className={rgbStyle.button85} onClick={boolean ? () => setBoolean(false) : handleSignUp}>Register</button>
            <button className={rgbStyle.button85} onClick={() => { setPseudo(''); setPassword(''); setConfirmPassword('');}} >Cancel</button>
         
          </div>
         
          <Link className={styles.customlink} to="/">Log In ?</Link>

        </div>

      </div>

    </div>

  );
}

export default SignUp;

