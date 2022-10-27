import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { FamilyManage } from './pages/family'
import FamilyCreate from './pages/family/FamilyCreate';
import FamilyNameEdit from './pages/family/FamilyNameEdit';

import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/family/manage/:id" element={ <FamilyManage /> }></Route>
          <Route path="/family/create" element={ <FamilyCreate /> }></Route>
          <Route path="/family/edit" element={ <FamilyNameEdit /> }></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
