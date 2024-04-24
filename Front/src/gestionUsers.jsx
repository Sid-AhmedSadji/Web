import styles from './Css/fileDAttente.module.css';
import React, { useEffect, useState } from 'react';
import api from './ApiCalls.js';
import Header from './Header.jsx';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

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
  const [listOfUsers, setListOfUsers] = useState([]);
  const [userType, setUserType] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [i, setI] = useState(0);

  async function fetchData() {
    const data = await getUsers();
    console.log(data)
    setListOfUsers(data.filter(user => user.type !== '0'));
  }

  useEffect(() => {
    toast.loading('Please wait...');

    async function checkSession() {
      try {
        console.log('Checking session...');
        const response = await api.checkSession();
        setUserType(response.usertype);
        await fetchData();
        setLoading(false);
      } catch (error) {
        console.error("Error", error.response.data.message);
        navigate("/");
      }
    };

    checkSession();

    const interval = setInterval(async () => {
      await fetchData();
      setLoading(false);
    }, 5000);

    toast.dismiss();

    return () => clearInterval(interval);
  }, [i]);

  async function changeType(props) {
    try {
      const { id, type } = props;
      console.log(id, type)
      const response = await api.changeTypeUser({ id: id, type: type });
    } catch (error) {
      console.error('Error:', error);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
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
      <Header setData={props.setData} shearchBar={false} />
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
              <button className={`${styles.myButton} ${styles.Accept}`} onClick={() => { changeType({ id: user._id, type: "user" }); setI(i + 1) }}>Unban</button> :
              <button className={`${styles.myButton} ${styles.Accept}`} onClick={() => { user.type === "admin" ? toast.error("Unpermitted action") : (changeType({ id: user._id, type: "admin" }) && setI(i + 1)) }}>Admin</button>
            }
            <button className={`${styles.myButton} ${styles.Refuse}`} onClick={() => { user.type === "admin" ? toast.error("Unpermitted action") : (changeType({ id: user._id, type: "banned" }) && setI(i + 1)) }}>Ban</button>
          </div>
        </form>
      ))}
    </div>
  );
}

export default App;
