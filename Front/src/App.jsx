// App.js
import LogIn from './LogIn.jsx';
import SignUp from './SignUp.jsx';
import Home from './Home.jsx';
import Profil from './Profil.jsx';
import MessagePage from './MessagePage.jsx';
import Request from './fileDAttente.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

//check si l'utilisateur est connecté via les cookies 



function App  () {

  const [user, setData] = useState(-1);


  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("http://192.168.1.168:8000/api/session");
        if (!response.ok) {
          // Gère les erreurs si la réponse n'est pas OK
          throw new Error('Erreur lors de la vérification de la session');
        }
        // Si la réponse est OK, retourne les données JSON de la réponse
        const data = await response.json();
        // Vérifie si un utilisateur est connecté
        if (data.message === "No user logged in") {
          console.log('Aucun utilisateur connecté');
        } else {
          // Traite les données de l'utilisateur
          console.log('Utilisateur connecté:', data.user);
        }
      } catch (error) {
        // Gère les erreurs
        console.error('Erreur:', error);
      }
    };
  
    checkSession();
  }, []);  
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home user={user} setData={setData}  />} />
        <Route path="SignUp" element={<SignUp />} />
        <Route path="LogIn" element={<LogIn  user={user} setData={setData} />} />
        <Route path="Profil" element={<Profil user={user} setData={setData}/>} />
        <Route path="Messages/:id" element={<MessagePage user={user} setData={setData}/>} />
        <Route path="Request" element={<Request user={user} setData={setData}/>} />
      </Routes>
    </Router>
  );
}

export default App;
