import styles from './Css/MenuRoulant.module.css';
import { Link } from 'react-router-dom';


function App(setData) {


  return (
    <details>
    <summary></summary>
    <nav className={styles.menu}>
      <Link to='/'>Public Forum</Link>
      <Link to='/'>Private Forum</Link>
      <Link to='/request'>User Request</Link>
      <Link to='/' onClick={()=>{setData(-1)}}>Sign out</Link>
    </nav>
  </details>
  );
}

export default App;

