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
import axios from 'axios';

const toLogIn = () => {
  toast.loading('Please wait...');
}

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
  
  const checkSession = async () => {
    try {
      console.log('Checking session...');
      const response = await fetch('http://localhost:4000/api/session', {
        method: 'GET',
        credentials: 'include'
      });
      if (response.status===200) {
        const data = await response.json();
        setUser(data.userid);
      }
      if (response.status===401) {
        const data = await response.json();
        throw new Error(data.message);
      }
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setLoading(false); // Marque la fin du chargement, que ce soit avec succès ou non
    }
  };
  //attendre la fin de checkUserCookie

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
