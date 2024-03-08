
import React, { useState, useEffect } from 'react';
import LogIn from './LogIn.jsx';
import SignUp from './SignUp.jsx';
import Home from './Home.jsx' ;
import MessagePage from './MessagePage.jsx'

function App() {
  const [isConnected, setIsConnected] = useState(true);
  const [actualPage, setActualPage] = useState("Home");

  useEffect(() => {
    // Utilisation de useEffect pour définir la page initiale lors du montage du composant
    if (!isConnected) {
      setActualPage("Login");
    }
  }, [isConnected]);

  return (
    <>
      {actualPage === 'Home' && <Home setPage={setActualPage} />}
      {actualPage === 'Login' && <LogIn setPage={setActualPage} />}
      {actualPage === 'Signup' && <SignUp setPage={setActualPage} />}
      {actualPage === 'Message' && <MessagePage setPage={setActualPage} />}
    </>
  );
}

export default App;

