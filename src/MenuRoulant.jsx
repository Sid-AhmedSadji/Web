import styles from './Css/MenuRoulant.module.css';
import { Link } from 'react-router-dom';


function App() {


  return (
    <details>
    <summary></summary>
    <nav className={styles.menu}>
      <Link to='/'>Public Forum</Link>
      <Link to='/'>Private Forum</Link>
      <Link to='/request'>User Request</Link>
      <Link to='/'>Sign out</Link>
    </nav>
  </details>
  );
}

export default App;

