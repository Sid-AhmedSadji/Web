import './App.css'
import {Link} from "react-router-dom";

function Login () {

  return (
    <div className='center'>
    <div className="mainsectionlogin">

      <h1 id='titre'>Connection</h1>
      <input type="text" placeholder="Pseudo" className="myLabel"/>
      <input type="password" placeholder="Mot de passe" className="myLabel"/>
      <div className="sectionButtons">
        <input type="button" value="Login" className="myButton"/>
        <input type="button" value="Cancel" className="myButton"/>
      </div>
      <Link to="/SignUp">Deja inscript ?</Link>
    </div>
    </div>
  );

};

export default Login ;
