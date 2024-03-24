import styles from './Css/fileDAttente.module.css'
import {Link} from 'react-router-dom';
import Menu from './MenuRoulant.jsx'

let listeUser = 
[
  {
    "nom":"Sadji",
    "prenom":"Sid-Ahmed",
    "pseudo":"Dido",
    "_id":"0"
  },
  {
    "nom":"Sid",
    "prenom":"Sid",
    "pseudo":"Sid",
    "_id":"1"
  },
  {
    "nom":"SidSID",
    "prenom":"SidSID",
    "pseudo":"SidSID",
    "_id":"2 "
  }
] 

function reject (event) {
  event.target.parentNode.parentNode.remove();;
}

function App () {
/*
  return (
    <>    
      <div className={styles.header}>
        <Link to="/">
          <img src="/logoSorbonneUniversite.png" alt="logo" className={styles.logo} />
       </Link>
      <Menu/>
      </div>
      <div className={styles.mainDiv}>
      <div className={styles.space} />
  <div className={styles.myForm}>
    <h4>Nom</h4>
    <h4>Prenom</h4>
    <h4>Pseudo</h4>
    <h4>Id</h4>
    <h4>Actions</h4>
  </div>

  <hr style={{ width: "65%" }} />

  {
  listeUser.map((user, index) => (
    <form key={index} className={styles.myForm}>
      <h4>{user.nom}</h4>
      <h4>{user.prenom}</h4>
      <h4>{user.pseudo}</h4>
      <h4>{user._id}</h4>
      <div>
        <button>Accepte</button>
        <button onClick={reject}>Reject </button>
      </div>
    </form>
  )) 
  }
      </div>

    </>
  );
}
*/
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


    {
      listeUser.map((user, index) => (
        <form key={index} className={styles.myForm}>
          <h4>{user.nom}</h4>
          <h4>{user.prenom}</h4>
          <h4>{user.pseudo}</h4>
          <h4>{user._id}</h4>
          <div>
            <button className={styles.myButton}>Accepte</button>
            <button onClick={reject} className={styles.myButton} >Reject </button>
          </div>
        </form>
  )) 
  }

      

  </div>
  );
}


export default App ;

