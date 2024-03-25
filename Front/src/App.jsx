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
async function getUser() {
  try {
    const response = await fetch("http://localhost:8000/readcookie");
    const jsonData = await response.json();
    console.log(jsonData);
    if (!jsonData.ok) {
      throw new Error(jsonData.cookieValue);
    }
    return (jsonData.cookieValue);
  } catch (error) {
    console.error('Error:', error);
    return -1 ;
  }
}


function App  () {

  const [user, setData] = useState(-1);


  useEffect(() => {
    // Appelle fetchData initialement
    getUser().then((value) => {
      setData(value);
    });
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
