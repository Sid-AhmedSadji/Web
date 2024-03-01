  import './App.css'
  import {Link} from "react-router-dom";
  import { useState } from 'react'

  function Login () {

    const [pseudo,setPseudo] = useState("")
    const [password,setPassword] = useState("") ;

    return (
      <div className='center'>
        <div className='rgb'>
          <div className="mainsectionlogin">
            <h1 id='titre'>Connection</h1>
            <input type="text" placeholder="Username" className="myLabel" value={pseudo} onChange={(e)=>setPseudo(e.target.value)}/>
            <input type="password" placeholder="Password" className="myLabel" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <div className="sectionButtons">
              <button className='button-85'>Login</button>
              <button className='button-85' onClick={()=>{setPseudo("");setPassword("");}} >Cancel</button>
            </div>
            <Link className="custom-link" to="/SignUp">Sign up ?</Link>
          </div>
        </div>
      </div>
    );

  };

  export default Login ;
