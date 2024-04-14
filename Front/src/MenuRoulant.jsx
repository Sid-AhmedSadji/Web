import styles from './Css/MenuRoulant.module.css'
import { Link } from 'react-router-dom'
import api from './ApiCalls.js'
// logout api

//Fonction asynchrone pour se déconnecter
async function logOut() {
  try {
    const response = await api.logout() //Appelle la fonction de déconnexion API

  } catch (error) {
    console.error(error)
  }
}


function App(user) {


  return (
    <details>
      <summary></summary>
      <nav className={styles.menu}>
        {user.type === "admin" && (
          <>
            <Link to="/request">User Request</Link>
            <Link to="/gestionUsers">User Management</Link>
          </>
        )}
        <Link to='/' onClick={()=>{ logOut(); }}>Log out</Link>
      </nav>
    </details>
  )
}

export default App

