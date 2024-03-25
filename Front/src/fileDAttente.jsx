import styles from './Css/fileDAttente.module.css'
import {Link} from 'react-router-dom';
import Menu from './MenuRoulant.jsx'
import { useEffect, useState } from 'react'



function deleteUser(id) {
  // Envoie une requête DELETE à l'API pour supprimer l'utilisateur avec l'ID spécifié
  fetch(`http://localhost:8000/api/user/${id}`, {
    method: 'DELETE',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erreur lors de la suppression de l\'utilisateur');
      }
      // Si la suppression est réussie, actualise la liste des utilisateurs
      fetchData();
    })
    .catch(error => {
      console.error('Erreur:', error);
    });
}

async function getUsers(setData) {
  try {
    const response = await fetch("http://localhost:8000/api/users");
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des données');
    }
    const jsonData = await response.json();
    setData(jsonData);
  } catch (error) {
    console.error('Erreur:', error);
  }
}


function App () {

  const [listeUser, setData] = useState([]);
  
  useEffect(() => {
    // Appelle fetchData initialement
    getUsers(setData);
  
    // Appelle fetchData toutes les secondes
    const interval = setInterval(async () => {
      await getUsers(setData);
    }, 1000);
  
    // Nettoie l'intervalle lorsque le composant est démonté
    return () => clearInterval(interval);
  }, []);
  

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <Link to="/">
          <img src="/logoSorbonneUniversite.png" alt="logo" className={styles.logo} />
        </Link>
        <Menu/>
      </div>

      <div className={styles.space} />

      <div className={styles.myForm}>
        <h4>Nom</h4>
        <h4>Prenom</h4>
        <h4>Pseudo</h4>
        <h4>Id</h4>
        <h4>Actions</h4>
      </div>
        
      <hr style={{ width: "65%" }} />

      {listeUser.map((user, index) => (
        <form key={index} className={styles.myForm}>
          <h4>{user.nom}</h4>
          <h4>{user.prenom}</h4>
          <h4>{user.pseudo}</h4>
          <h4>{user.id}</h4>
          <div>
            <button className={styles.myButton}>Accepte</button>
            <button onClick={() => deleteUser(user.id)} type={'submit'} className={styles.myButton} >Reject </button>
          </div>
        </form>
      ))} 
    </div>
  );
}

export default App;