import styles from './Css/fileDAttente.module.css';
import { useNavigate } from 'react-router-dom';
import Header from './Header.jsx';
import { useEffect, useState } from 'react';
import api from './ApiCalls.js';
import toast, { Toaster } from 'react-hot-toast';

async function getUsers() {
  try{
    const data = await api.getUser({login:null, id:null, type:null});
    return data;

  } catch (error) {
    console.error('Erreur:', error.response.data);
    return {data:[]};
  }
}





function App( props ) {
  const [listeUser, setData] = useState([]);
  const [type, setType] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [i, setI] = useState(0);
  
  async function fetchData() {
    const data = await getUsers();
    data.data === undefined ? setData(data.filter(user => user.type !== "0")) : [] ;
  }

  
useEffect(() => {
  toast.loading('Please wait...');

  async function checkSession() {
    try {
      console.log('Checking session...');
      const response = await api.checkSession();
      setType(response.usertype);
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
    try{
      const {id,type} = props;
      console.log(id,type)
      const reponse = await api.changeTypeUser({id:id,type:type});
    } catch (error) {
      console.error('Erreur:', error);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (type !== "admin") {
    return ( 
      <div>
        <h1>Page Interdite</h1>
      </div>
    )
  }


  return (
    <div className={styles.main}>
      <Toaster />
      
      <Header setData={props.setData} shearchBar={false} />
      

      <div className={styles.myForm}>
        <h4>Nom</h4>
        <h4>Prenom</h4>
        <h4>Pseudo</h4>
        <h4>Type</h4>
        <h4>Actions</h4>
      </div>

      <hr style={{ width: "55%" }} />

      {listeUser.map((user, index) => (
        <form key={index} className={styles.myForm} onSubmit={(e) => {e.preventDefault() }}>
          <h4>{user.lastname}</h4>
          <h4>{user.firstname}</h4>
          <h4>{user.login}</h4>
          <h4>{user.type}</h4>
          <div className={ styles.btnDiv}>
            {
              user.type === "banned" ? 
              <button className={`${styles.myButton} ${styles.Accept}`} onClick={() =>{changeType({id:user._id,type:"user"}),setI(i+1)} } >Unban</button>

                : <button className={`${styles.myButton} ${styles.Accept}`} onClick={() =>{user.type === "admin" ? toast.error("Unpermited action") : changeType({id:user._id,type:"admin"}) && setI(i+1) } } >Admin</button>
            }
            <button className={`${styles.myButton} ${styles.Refuse}`} onClick={() =>{user.type === "admin" ? toast.error("Unpermited action") : changeType({id:user._id,type:"banned"}) && setI(i+1) } } >Ban</button>
          </div>
        </form>

      ))}
    </div>
  );
}

export default App;
