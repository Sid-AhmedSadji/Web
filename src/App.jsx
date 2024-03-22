// App.js
import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogIn from './LogIn.jsx';
import SignUp from './SignUp.jsx';
import Home from './Home.jsx';
import Profil from './Profil.jsx';
import MessagePage from './MessagePage.jsx';

function App  () {

  const [user, setUser] = useState(null);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home  />} />
        <Route path="SignUp" element={<SignUp />} />
        <Route path="LogIn" element={<LogIn />} />
        <Route path="Profil" element={<Profil />} />
        <Route path="Messages/:id" element={<MessagePage />} />
      </Routes>
    </Router>
  );
}

export default App;

