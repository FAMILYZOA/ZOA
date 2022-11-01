import React from 'react';
<<<<<<< HEAD
import { BrowserRouter, Route, Routes } from "react-router-dom";
=======
>>>>>>> 40c7c29ea7e9e1eb73d70a7b607f95b02f1a5295
import Main from './pages/main/main';
import Login from "./pages/auth/login";
import Prelogin from "./pages/auth/prelogin";
import Signup from "./pages/auth/signup";
import { FamilyManage } from './pages/family'
import ScrumCreate from './pages/scrum/scrumCreate';
import FamilyCreate from './pages/family/FamilyCreate';
import FamilyNameEdit from './pages/family/FamilyNameEdit';
import Test from "./pages/auth/kakao/Test";
import KakaoSignup from './pages/auth/kakao/kakaoSignUp';
import './App.css';
import Resister from './pages/auth/Resister';
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
        </Routes>
        <Navbar></Navbar>
      </BrowserRouter>
    </div>
  );
}

export default App;
