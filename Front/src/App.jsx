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
import toast, { Toaster } from 'react-hot-toast';
import api from './ApiCalls';

function App() {
  const [user, setUser] = useState(null); //Gestion de l'état de l'utilisateur
  const [loading, setLoading] = useState(true); //Gestion de l'état de chargement


  //Effet pour vérifier la session utilisateur au démarrage de l'application
  useEffect(() => {
  
   //Définition de la fonction checkSession
  const checkSession = async () => { //Elle est responsable de faire des appels API pour vérifier si l'utilisateur est déjà connecté quand l'application charge.
    try {
      console.log('Checking session...');
      const response = await api.checkSession(); //Tentative de récupération de l'état de session de l'utilisateur 
      //Attention : api.checkSession() est une fonction défini dans apiCall.js
      setUser(response.userid); //Mise à jour de l'état de l'utilisateur
    } catch (error) { 
      //Gestion des erreurs
      console.error(error.response.data.message);
    } finally {
      setLoading(false); // Marque la fin du chargement, que ce soit avec succès ou non
    }
  };

  checkSession(); //Appel de la fonction checkSession
}, []); //Tableau des dépendances vide (UseEffect ne s'exécutera qu'une seule fois.)

  //Affichage en cas de chargement
  if (loading) {
    return <div>Loading...</div>;
  }

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


