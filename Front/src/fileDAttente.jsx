import styles from './Css/fileDAttente.module.css';
import { Link,useNavigate } from 'react-router-dom';
import Menu from './MenuRoulant.jsx';
import Header from './Header.jsx';
import { useEffect, useState } from 'react';
import api from './ApiCalls.js';

async function getUsers() {
  try{
    const data = await api.getUser({login:null, id:null, type:"0"});
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

  useEffect(() => {

    async function fetchData() {
      const data = await getUsers({type:"0"});
      data.data === undefined ? setData(data) : [] ;
    }

    async function checkSession () {
      try {
        console.log('Checking session...');
        const response = await api.checkSession();
        setType(response.usertype);
        fetchData();
        setLoading(false);
      } catch (error) {
        console.error("Error", error.response.data.message);
        navigate ("/");
      }
    };

    checkSession();

    

    const interval = setInterval(async () => {
      await fetchData();
      setLoading(false);
    }, 5000);

    return () => clearInterval(interval);
  }, []);




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
      
      <Header setData={props.setData} shearchBar={false} />
      

      <div className={styles.myForm}>
        <h4>Nom</h4>
        <h4>Prenom</h4>
        <h4>Pseudo</h4>
        <h4>Actions</h4>
      </div>

      <hr style={{ width: "55%" }} />

      {listeUser.map((user, index) => (
        <form key={index} className={styles.myForm}>
          <h4>{user.lastname}</h4>
          <h4>{user.firstname}</h4>
          <h4>{user.login}</h4>
          <div>
            <button className={styles.myButton} onClick={() => changeType({id:user._id,type:"user"})} type={'submit'}>Accepte</button>
            <button onClick={() => changeType({id:user._id,type:"banned"})}  className={styles.myButton}>Reject </button>
          </div>
        </form>
      ))}
    </div>
  );
}

export default App;
