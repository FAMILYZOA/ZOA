import React from 'react';
import Main from './pages/main/main';
import Login from "./pages/auth/login";
import Prelogin from "./pages/auth/prelogin";
import Signup from "./pages/auth/signup";
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { FamilyManage } from './pages/family'
import ScrumCreate from './pages/scrum/scrumCreate';
import FamilyCreate from './pages/family/FamilyCreate';
import FamilyNameEdit from './pages/family/FamilyNameEdit';
import Test from "./pages/auth/kakao/Test";
import KakaoSignup from './pages/auth/kakao/kakaoSignUp';
import './App.css';
import Resister from './pages/auth/Resister';
import NewLogin from "./pages/auth/kakao/Login"

import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/family/manage/:id" element={ <FamilyManage /> }></Route>
          <Route path="/family/create" element={ <FamilyCreate /> }></Route>
          <Route path="/family/edit" element={ <FamilyNameEdit /> }></Route>
          <Route path="/scrum/create" element={ <ScrumCreate />}></Route>
          <Route path="/intro" element={<Prelogin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/main" element={<Main />} />
          <Route path="/" element={<Test />} />
          <Route path="/kakaoSignup" element={<KakaoSignup />} />
          <Route path="/register" element={<Resister />} />
          <Route path="/newLogin" element={<NewLogin />} />
        </Routes>
        <Navbar></Navbar>
      </BrowserRouter>
    </div>
  );
}

export default App;
