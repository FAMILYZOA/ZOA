import React from "react";
import logo from "./logo.svg";
import Login from "./pages/auth/login";
import Prelogin from "./pages/auth/prelogin";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Prelogin />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
