import styles from './Css/fileDAttente.module.css';
import Header from './Header.jsx';
import { useEffect, useState } from 'react';
import api from './ApiCalls.js';
import toast, { Toaster } from 'react-hot-toast';

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

  useEffect(() => {
    toast.promise(
      (async () => {
        console.log('Checking session...');
        const response = await api.checkSession();
        setType(response.usertype);
        const newUsers = await getUsers({ type: '0' });
        setData(newUsers);
        setLoading(false);
        return 'Done!';
      })(),
      {
        loading: 'Connecting to server ...',
        success: 'Done!',
        error: (err) => `Login failed: ${err?.response?.data || 'Internal server error'}`
      }
    );
  }, []);

  async function changeType(props) { 
    try {
      const { id, type } = props;
      const reponse = await api.changeTypeUser({ id: id, type: type });
      const newUsers = await getUsers({ type: '0' });
      setData(newUsers);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  //Affichage du chargement
  //Affiche un indicateur de chargement

  if (loading) {
    return <><Toaster /></>;
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
      <Toaster />
      <Header setData={props.setData} searchBar={false} user={userType} />
      <div className={styles.myForm}>
        <h4>Lastname</h4>
        <h4>Firstname</h4>
        <h4>Username</h4>
        <h4>Actions</h4>
      </div>
      <hr style={{ width: '55%' }} />
      {users.data ? (
        <></>
     ) : (
        users.map((user, index) => (
          <form key={index} className={styles.myForm} onSubmit={(e) => e.preventDefault()}>
            <h4>{user.lastname}</h4>
            <h4>{user.firstname}</h4>
            <h4>{user.login}</h4>
            <div className={styles.btnDiv}>
              <button
                className={`${styles.myButton} ${styles.Accept}`}
                onClick={() =>
                  toast.promise(
                    changeType({id:user._id, tpe:'user'}),
                    {
                      loading: 'Changing user type...',
                      success: 'Done!',
                      error: 'Error changing user type',
                    }
                  )
                }
              >
                Accept
              </button>
              <button
                className={`${styles.myButton} ${styles.Refuse}`}
                onClick={() =>
                  toast.promise(
                    changeType({id:user._id, type:'banned'}),
                    { loading: 'Changing user type...', success: 'Done!', error: 'Error changing user type' }
                  )
                }
              >
                Refuse
              </button>
            </div>
          </form>
        ))
      )}
    </div>
  );
}

export default App;

