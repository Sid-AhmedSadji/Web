import styles from './Css/fileDAttente.module.css';
import { Link } from 'react-router-dom';
import Menu from './MenuRoulant.jsx';
import Header from './Header.jsx';
import { useEffect, useState } from 'react';

async function getUsers(setData) {
  try {
    const response = await fetch("http://localhost:4000/api/users");
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des données');
    }
    const jsonData = await response.json();
    setData(jsonData.filter(user => user.type === 0));
  } catch (error) {
    console.error('Erreur:', error);
  }
}






function App( props ) {
  const [listeUser, setData] = useState([]);
  const [type, setType] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function fetchData() {
      await getUsers(setData);
    }

    async function fetchType() {
      //recherche dans listeUser le type de l'utilisateur connecté qui est dans props.user
      const user_type = listeUser.find(user => user.id === props.user.id).type;
      setType(user_type);
      setLoading(false);
    }

    fetchType()
    fetchData();

    const interval = setInterval(async () => {
      await fetchData();
      setLoading(false);
    }, 1000);

    return () => clearInterval(interval);
  }, []);




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
        getUsers(setData);
      })
      .catch(error => {
        console.error('Erreur:', error);
      });
  }

  function acceptUser(userId) {
    // Envoie une requête POST à l'API pour accepter l'utilisateur avec l'ID spécifié
    fetch(`http://localhost:8000/api/changeType`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id:userId, type: 1 }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de l\'acceptation de l\'utilisateur');
        }
        // Si l'acceptation est spécie, actualise la liste des utilisateurs
        getUsers(setData);
      })
      .catch(error => {
        console.error('Erreur:', error);
      });
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (type !== 2) {
    return ( 
      <div>
        <h1>Page Interdite</h1>
      </div>
    )
  }

  return (
    <div className={styles.main}>
      
      <Header setData={props.setData} shearchBar={false} />
      

      <div className={styles.myForm}>
        <h4>Nom</h4>
        <h4>Prenom</h4>
        <h4>Pseudo</h4>
        <h4>Id</h4>
        <h4>Actions</h4>
      </div>

      <hr style={{ width: "55%" }} />

      {listeUser.map((user, index) => (
        <form key={index} className={styles.myForm}>
          <h4>{user.nom}</h4>
          <h4>{user.prenom}</h4>
          <h4>{user.pseudo}</h4>
          <h4>{user.id}</h4>
          <div>
            <button className={styles.myButton} onClick={() => acceptUser(user.id)} type={'submit'}>Accepte</button>
            <button onClick={() => deleteUser(user.id)} type={'submit'} className={styles.myButton}>Reject </button>
          </div>
        </form>
      ))}
    </div>
  );
}

export default App;
