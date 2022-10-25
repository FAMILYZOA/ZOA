import React from "react";
import Login from "./pages/auth/login";
import Prelogin from "./pages/auth/prelogin";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/auth/signUp";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Prelogin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
