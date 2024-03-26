// App.js
import LogIn from './LogIn.jsx';
import SignUp from './SignUp.jsx';
import Home from './Home.jsx';
import Profil from './Profil.jsx';
import MessagePage from './MessagePage.jsx';
import Request from './fileDAttente.jsx';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const toLogIn = () => {
  toast.loading('Please wait...');
}

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /*
    const checkSession = async () => {
      try {
        const response = await fetch('http://localhost:8000/checkUserCookie', {
          method: 'GET',
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false); // Marque la fin du chargement, que ce soit avec succès ou non
      }
    };
    //attendre la fin de checkUserCookie
    checkSession();
  }, []);
  */

  
  const checkSession = async () => {
    try {
      console.log('http://localhost:8000/api/session');
      const response = await fetch('http://localhost:8000/api/session', {
        method: 'GET',
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        if (data.ok) {
          console.log(response);
          setUser(data.user);
        }else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error:', error);
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
        <Route path="/" element={<Home user={user} setData={setUser} />} />
        <Route path="/SignUp" element={<SignUp user={user} setData={setUser}/>} />
        <Route path="/LogIn" element={<LogIn user={user} setData={setUser} />} />
        <Route path="/Profil" element={ <Profil />} />
        <Route path="/Messages/:id" element={ <MessagePage /> } />
        <Route path="/Request" element={<Request /> } />
      </Routes>
    </Router>
  );
}

export default App;
