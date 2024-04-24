import styles from './Css/fileDAttente.module.css';
import React, { useEffect, useState } from 'react';
import api from './ApiCalls.js';
import Header from './Header.jsx';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

//Fonction asynchrone pour récupérer la liste des utilisateurs
async function getUsers() {
  try {
    const data = await api.getUser({ login: null, id: null, type: null });
    return data;
  } catch (error) {
    console.error('Error:', error.response.data);
    return { data: [] };
  }
}

function App(props) {
  const [listOfUsers, setListOfUsers] = useState([]); //Stocke la liste des utilisateurs
  const [userType, setUserType] = useState(0); //Stocke le type de l'utilisateur actuel
  const [loading, setLoading] = useState(true); //Indique si les données sont en train de charger
  const navigate = useNavigate();


  useEffect(() => {
    toast.promise(
      (async () => {
        console.log('Checking session...');
        const response = await api.checkSession();
        setUserType(response.usertype);
        await fetchData();
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

  //Fonction pour récupérer les données des utilisateurs
  async function fetchData() {
    const data = await getUsers();
    setListOfUsers(data.filter(user => user.type !== '0'));
  }

  //Fonction pour changer le type d'un utilisateur
  async function changeType(props) {
    const id = props.id;
    const type = props.type;
    return toast.promise(
      (async () => {
        const response = await api.changeTypeUser({ id: id, type: type });
        await fetchData();
      })(),
      { loading: 'Changing user type...', success: 'Done!', error: 'Error changing user type' }
    );
  }

  //Affiche un indicateur de chargement
  if (loading) {
    return <><Toaster /></>;
  }
  


  if (userType !== 'admin') {
    return (
      <div>
        <h1>Forbidden Page</h1>
      </div>
    )
  }

  return (
    <div className={styles.main}>
      <Toaster />
      <Header setData={props.setData} shearchBar={false} user={userType}/>
      <div className={styles.myForm}>
        <h4>Lastname</h4>
        <h4>Firstname</h4>
        <h4>Login</h4>
        <h4>Type</h4>
        <h4>Actions</h4>
      </div>
      <hr style={{ width: "55%" }} />
      {listOfUsers.map((user, index) => (
        <form key={index} className={styles.myForm} onSubmit={(e) => { e.preventDefault() }}>
          <h4>{user.lastname}</h4>
          <h4>{user.firstname}</h4>
          <h4>{user.login}</h4>
          <h4>{user.type}</h4>
          <div className={styles.btnDiv}>
            {user.type === "banned" ?
              <button className={`${styles.myButton} ${styles.Accept}`} onClick={() => { toast.promise(changeType({ id: user._id, type: "user" }), { loading: 'Unbanning...', success: 'Done!', error: 'Error' }) }}>Unban</button> :
              <button className={`${styles.myButton} ${styles.Accept}`} onClick={() => { toast.promise(changeType({ id: user._id, type: "admin" }), { loading: 'Giving rights...', success: 'Done!', error: 'Error' }) }}>Admin</button>
            }
            <button className={`${styles.myButton} ${styles.Refuse}`} onClick={() => { toast.promise(changeType({ id: user._id, type: "banned" }), { loading: 'Banning...', success: 'Done!', error: 'Error' }) }}>Ban</button>
          </div>
        </form>
      ))}
    </div>
  );
}

export default App;


