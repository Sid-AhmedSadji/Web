import styles from './Css/MenuRoulant.module.css';
import { Link } from 'react-router-dom';
import api from './ApiCalls.js';
//logout api 

async function logOut() {
  try {
    const response = await api.logout();

  } catch (error) {
    console.error(error);
  }
}


function App(setData) {


  return (
    <details>
    <summary></summary>
    <nav className={styles.menu}>
      <Link to='/request'>User Request</Link>
      <Link to='/' onClick={()=>{ logOut();setData(null)}}>Sign out</Link>
    </nav>
  </details>
  );
}

export default App;

