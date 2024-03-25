// App.js
import LogIn from './LogIn.jsx';
import SignUp from './SignUp.jsx';
import Home from './Home.jsx';
import Profil from './Profil.jsx';
import MessagePage from './MessagePage.jsx';
import Request from './fileDAttente.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App  () {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home /> }/>
        <Route path="SignUp" element={<SignUp />} />
        <Route path="LogIn" element={<LogIn />} />
        <Route path="Profil" element={<Profil />} />
        <Route path="Messages/:id" element={<MessagePage />} />
        <Route path="Request" element={<Request />} />
      </Routes>
    </Router>
  );
}

export default App;
