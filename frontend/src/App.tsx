import React from 'react';
import './App.css';
import Prelogin from "./pages/auth/prelogin";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/prelogin" element={<Prelogin/>} ></Route>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
