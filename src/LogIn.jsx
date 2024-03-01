import './App.css'
import {Link} from "react-router-dom";

function Login () {

  return (
    <mainsectionlogin>
      <h1 id='titre'>Connection</h1>
      <input type="text" placeholder="Pseudo" className="myLabel"/>
      <input type="password" placeholder="Mot de passe" className="myLabel"/>
      <sectionButtons>
        <input type="button" value="Login" className="myButton"/>
        <input type="button" value="Cancel" className="myButton"/>
      </sectionButtons>
      <Link to="/SignUp">Deja inscript ?</Link>
    </mainsectionlogin>
  );

};

export default Login ;
