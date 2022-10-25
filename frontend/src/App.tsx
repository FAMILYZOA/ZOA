import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { FamilyManage } from './pages/family'

import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/family/manage" element={ <FamilyManage /> }></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
