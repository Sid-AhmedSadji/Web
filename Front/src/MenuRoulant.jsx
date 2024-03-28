import styles from './Css/MenuRoulant.module.css';
import { Link } from 'react-router-dom';

//logout api 

async function logOut() {
  try {
    const response = await fetch('http://localhost:4000/api/user/logout',
      {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      }
    );
    if (!response) {
      throw new Error('Erreur lors de la déconnexion');
    }
    console.log('Response:', response);
    

  } catch (error) {
    console.error(error);
  }
}


function App(setData) {


  return (
    <details>
    <summary></summary>
    <nav className={styles.menu}>
      <Link to='/'>Public Forum</Link>
      <Link to='/'>Private Forum</Link>
      <Link to='/request'>User Request</Link>
      <Link to='/' onClick={()=>{ logOut();setData(null)}}>Sign out</Link>
    </nav>
  </details>
  );
}

export default App;

