import styles from './Css/fileDAttente.module.css';
import { Link, useNavigate } from 'react-router-dom';
import Menu from './MenuRoulant.jsx';
import Header from './Header.jsx';
import { useEffect, useState } from 'react';
import api from './ApiCalls.js';

//Fonction asynchrone pour récupérer les utilisateurs
async function getUsers() {
  try {
    const data = await api.getUser({ //Appel API pour récupérer des utilisateurs de type '0' (en attente)
      login: null,
      id: null,
      type: '0',
    });
    return data;

  } catch (error) {
    console.error('Error:', error.response.data);
    return { data: [] }; //Retourne un tableau vide en cas d'erreur
  }
}

function App(props) {
  const [users, setData] = useState([]); //État pour stocker les utilisateurs
  const [userType, setType] = useState(0); //État pour le type de l'utilisateur actuel
  const [loading, setLoading] = useState(true); //État de chargement
  const navigate = useNavigate(); //Hook pour la navigation programmée (Redirection)

  useEffect(() => {
    //Récupération des données des utilisateurs
    async function fetchData() {
      const data = await getUsers({ type: '0' });
      data.data === undefined ? setData(data) : [];
    }

    //Vérification de la session et initialisation des données
    try {
    async function checkSession() {
      try {
        console.log('Checking session...');
        const response = await api.checkSession();
        setType(response.usertype);
        fetchData();
        setLoading(false);
      } catch (error) {
        console.error('Error', error.response.data.message);
        navigate('/'); //Redirige vers l'accueil en cas d'erreur
      }
    }

    checkSession();

    //Actualise les données toutes les 5 secondes
    const interval = setInterval(async () => {
      await fetchData();
      setLoading(false);
    }, 5000);

    return () => clearInterval(interval); //Nettoyage de l'intervalle à la désinscription du composant
  }, []);

  //Change le type d'un utilisateur
  async function changeType(props) { 
    try {
      const { id, type } = props;
      console.log(id, type);
      const reponse = await api.changeTypeUser({ id: id, type: type });
    } catch (error) {
      console.error('Error:', error);
    }
  }

  //Affichage du chargement
  if (loading) {
    return <div>Loading...</div>;
  }

  if (userType !== 'admin') {
    return (
      <div>
        <h1>Page Forbidden</h1>
      </div>
    );
  }

  return (
    <div className={styles.main}>
      <Header setData={props.setData} searchBar={false} />
      <div className={styles.myForm}>
        <h4>Lastname</h4>
        <h4>Firstname</h4>
        <h4>Username</h4>
        <h4>Actions</h4>
      </div>
      <hr style={{ width: '55%' }} />
      {users.map((user, index) => (
        <form key={index} className={styles.myForm}>
          <h4>{user.lastname}</h4>
          <h4>{user.firstname}</h4>
          <h4>{user.login}</h4>
          <div className={styles.btnDiv}>
            <button
              className={`${styles.myButton} ${styles.Accept}`}
              onClick={() => changeType({ id: user._id, type: 'user' })}
              type="submit"
            >
              Accept
            </button>
            <button
              className={`${styles.myButton} ${styles.Refuse}`}
              onClick={() => changeType({ id: user._id, type: 'banned' })}
            >
              Refuse
            </button>
          </div>
        </form>
      ))}
    </div>
  );
}

export default App;

