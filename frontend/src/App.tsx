import React from 'react';
import Login from "./pages/auth/login";
import Prelogin from "./pages/auth/prelogin";
import Signup from "./pages/auth/signup";
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { FamilyManage } from './pages/family'
// import ScrumCreate from './pages/scrum/scrumCreate';
import FamilyCreate from './pages/family/FamilyCreate';
import FamilyNameEdit from './pages/family/FamilyNameEdit';
import KakaoSignup from "./pages/auth/kakao/kakaoSignUp";
import Test from "./pages/auth/kakao/Test";
import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/family/manage/:id" element={ <FamilyManage /> }></Route>
          <Route path="/family/create" element={ <FamilyCreate /> }></Route>
          <Route path="/family/edit" element={ <FamilyNameEdit /> }></Route>
          {/* <Route path="/scrum/create" element={ <ScrumCreate />}></Route> */}
          <Route path="/intro" element={<Prelogin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/kakao" element={<KakaoSignup />} />
          <Route path="/" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
