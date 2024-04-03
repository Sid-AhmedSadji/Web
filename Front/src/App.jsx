// App.js
import LogIn from './LogIn.jsx';
import SignUp from './SignUp.jsx';
import Home from './Home.jsx';
import Profil from './Profil.jsx';
import MessagePage from './MessagePage.jsx';
import Request from './fileDAttente.jsx';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, createBrowserRouter } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import api from './ApiCalls';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
  
  const checkSession = async () => {
    try {
      console.log('Checking session...');
      const response = await api.checkSession();
      setUser(response.userid);
    } catch (error) {
      console.error( error.response.data.message);
    } finally {
      setLoading(false); // Marque la fin du chargement, que ce soit avec succès ou non
    }
  };

  checkSession();
}, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home user={user} setUser={setUser} /> : <LogIn user={user} setUser={setUser} />} />
        <Route path="/SignUp" element={<SignUp user={user} setUser={setUser}/>} />
        <Route path="/Profil/:login" element={ <Profil />} />
        <Route path="/Messages/:id" element={ <MessagePage /> } />
        <Route path="/Request" element={<Request user={user} setUser={setUser} /> } />
      </Routes>
    </Router>

  );
}

export default App;
