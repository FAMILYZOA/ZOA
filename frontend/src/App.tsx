import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from './pages/main/main';


function App() {
  return (
    <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Main/>}/>
          </Routes>
        </div>
    </Router>
  );
}

export default App;
