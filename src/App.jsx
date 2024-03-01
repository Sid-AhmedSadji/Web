import React from "react";
import {
 BrowserRouter as Router,
 Routes,
 Route
} from "react-router-dom";

import LogIn from "./LogIn.jsx"
import SignUp from "./SignUp.jsx"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="SignUp" element={<SignUp />} />
        <Route path="LogIn" element={<LogIn />} />
      </Routes>
    </Router>
  );
}

export default App;
