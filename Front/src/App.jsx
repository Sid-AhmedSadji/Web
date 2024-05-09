// App.js
//Le composant App englobe la structure principales de l'application en organisant les autres composants.
//Importation de composants et de bibliothèques
import LogIn from './LogIn.jsx';
import SignUp from './SignUp.jsx';
import Home from './Home.jsx';
import Profil from './Profil.jsx';
import MessagePage from './MessagePage.jsx';
import Request from './fileDAttente.jsx';
import Gestion from './gestionUsers.jsx';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import api from './ApiCalls';
import toast from 'react-hot-toast';

function App() {
  const [user, setUser] = useState(null); //Gestion de l'état de l'utilisateur


  const checkSessionPromise = () => {
    return toast.promise(
      api.checkSession().then(response => {
        setUser(response.userid);
      }),
      {
        loading: 'Connecting to server ...',
        success: 'Connected',
        error: 'Error while checking session'
      }
    );
  };

  useEffect(() => {
    checkSessionPromise();
  }, []); //Tableau des dépendances vide (UseEffect ne s'exécutera qu'une seule fois.)

  //Configuration du routage avec react-router-dom
  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home user={user} setUser={setUser} /> : <LogIn user={user} setUser={setUser} />} />
        <Route path="/SignUp" element={<SignUp user={user} setUser={setUser}/>} />
        <Route path="/Profil/:login" element={<Profil />} />
        <Route path="/Messages/:id" element={<MessagePage />} />
        <Route path="/Request" element={<Request user={user} setUser={setUser} />} />
        <Route path="/gestionUsers" element={<Gestion />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>

  );
}

export default App;


