// App.js
import LogIn from './LogIn.jsx';
import SignUp from './SignUp.jsx';
import Home from './Home.jsx';
import Profil from './Profil.jsx';
import MessagePage from './MessagePage.jsx';
import Request from './fileDAttente.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

function App  () {

  const [user, setData] = useState(-1);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="SignUp" element={<SignUp />} />
        <Route path="LogIn" element={<LogIn  user={user} />} />
        <Route path="Profil" element={<Profil user={user}/>} />
        <Route path="Messages/:id" element={<MessagePage user={user}/>} />
        <Route path="Request" element={<Request user={user}/>} />
      </Routes>
    </Router>
  );
}

export default App;
