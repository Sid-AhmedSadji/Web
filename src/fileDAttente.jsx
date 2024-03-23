import styles from './Css/fileDAttente.module.css'

function App () {

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
      }
    ] 
  return (
    <>
      {
        listeUser.map((user,index)=>(
	 <form className={styles.myForm} >
	   <h4>{user.nom}</h4>
	   <h4>{user.prenom}</h4>
           <h4>{user.pseudo}</h4>
	   <h4>{user._id}</h4>
	   <div>
	     <button>Accepte</button>
	     <button>Reject</button>
           </div>
	 </form>
	)) 
      }
    </>
  );
}

export default App ;
