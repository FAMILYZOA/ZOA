import React, { useEffect, useState, useCallback } from "react";
import Main from "./pages/main/main";
import Prelogin from "./pages/auth/prelogin";
import { Settings } from "./pages/settings";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { FamilyManage } from "./pages/family";
import ScrumCreate from "./pages/scrum/scrumCreate";
import FamilyCreate from "./pages/family/FamilyCreate";
import FamilyNameEdit from "./pages/family/FamilyNameEdit";
import KakaoSignup from "./pages/auth/kakao/kakaoSignUp";
import "./App.css";
import Resister from "./pages/auth/Resister";
import NewLogin from "./pages/auth/kakao/Login";
import KakaoLoding from "./pages/auth/kakao/KakaoLoading";
import { ReadChecklist, CreateChecklist } from "./pages/checklist";
import ScrumHome from "./pages/scrum/ScrumHome";
import FamilyJoin from "./pages/family/FamilyJoin";

import Navbar from "./components/Navbar";

import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
  setUserFamilyId,
  setUserId,
  setUserKakaoId,
  setUserPhone,
  setUserBirth,
  setUserImage,
  setUserName,
} from "./features/user/userSlice";
import {
  setFamilyCreatedAt,
  setFamilyId,
  setFamilyName,
  setFamilyUsers,
} from "./features/family/familySlice";
import axios from "axios";

function App() {
  const accessToken = useAppSelector((state) => state.token.access);
  const userId = useAppSelector((state) => state.user.id);
  const familyId = useAppSelector((state) => state.family.id);
  const fontSize = useAppSelector((state) => state.setting.fontSize);
  const dispatch = useAppDispatch();
  const [, updateState] = useState<{}>();
  const forceUpdate = useCallback(() => updateState({}), []);

  const fontArray = ["2vh", "2.5vh", "3vh"];

  const [fontStyle, setFontStyle] = useState<{ fontSize: string }>({
    fontSize: fontArray[fontSize],
  });

  const infoUpdate = () => {
    if (accessToken === "") {
      // 토큰이 없는 경우
      if (userId >= 0) {
        // 유저 값 초기화. id 값이 양의 정수면 들어있다고 판단.
        dispatch(setUserId(-1));
        dispatch(setUserPhone(""));
        dispatch(setUserKakaoId(-1));
        dispatch(setUserFamilyId(-1));
        dispatch(setUserBirth(""));
        dispatch(setUserImage(""));
        dispatch(setUserName(""));
      }
      if (familyId >= 0) {
        // 패밀리 값 초기화. id 값이 양의 정수면 들어있다고 판단.
        dispatch(setFamilyId(-1));
        dispatch(setFamilyName(""));
        dispatch(setFamilyCreatedAt(""));
        dispatch(
          setFamilyUsers([
            {
              id: -1,
              name: "",
              image: "",
              set_name: "",
            },
          ])
        );
        console.log("family info initialized");
      }
    } else {
      // 토큰이 있는 경우
      if (userId < 0) {
        // 유저 값이 없으면, 유저 정보 불러오기
        axios({
          method: "get",
          url: `${process.env.REACT_APP_BACK_HOST}/accounts/profile/`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .then((res) => {
            dispatch(setUserId(res.data.id));
            dispatch(setUserPhone(res.data.phone));
            dispatch(setUserKakaoId(-1));
            dispatch(setUserFamilyId(res.data.family_id));
            dispatch(setUserBirth(res.data.birth));
            dispatch(setUserImage(res.data.image));
            dispatch(setUserName(res.data.name));
            console.log("user fetched");
            forceUpdate();
            if (familyId < 0 && res.data.family_id) {
              // 가족 정보가 없으면, 가족 정보 불러오기
              axios({
                method: "get",
                url: `${process.env.REACT_APP_BACK_HOST}/family/${res.data.family_id}`,
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              })
                .then((res) => {
                  dispatch(setFamilyId(res.data.id));
                  dispatch(setFamilyName(res.data.name));
                  dispatch(setFamilyCreatedAt(res.data.created_at));
                  dispatch(setFamilyUsers(res.data.users));
                  console.log("family fetched");
                  forceUpdate();
                })
                .catch((err) => {
                  console.error(err);
                });
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
  };

  useEffect(() => {
    setFontStyle({
      fontSize: fontArray[fontSize],
    });
  }, [fontSize]);

  useEffect(() => {
    infoUpdate();
  }, [accessToken]);

  return (
    <div style={fontStyle}>
      <BrowserRouter>
        <Routes>
          <Route path="/join/:familyId" element={<FamilyJoin />} />
          {/* <Route path="/join/:familyId" element={<FamilyJoin />} /> */}

          <Route path="/intro" element={<Prelogin />} />
          <Route path="/login" element={<NewLogin />} />
          <Route path="/register" element={<Resister />} />
          <Route path="/kakaoSignup" element={<KakaoSignup />} />
          <Route path="/kakaoLoading/" element={<KakaoLoding />} />

          <Route path="/family/create" element={<FamilyCreate />}></Route>
          <Route path="/family/manage" element={<FamilyManage />}></Route>
          <Route path="/family/create" element={<FamilyCreate />}></Route>
          <Route path="/family/edit" element={<FamilyNameEdit />}></Route>

          <Route path="/" element={<Main />} />

          <Route path="/hello/" element={<ScrumHome />}></Route>
          <Route path="/hello/create" element={<ScrumCreate />}></Route>

          <Route path="/checklist" element={<ReadChecklist />} />
          <Route path="/checklist/create" element={<CreateChecklist />} />

          <Route path="/settings" element={<Settings />} />
        </Routes>
        <Navbar></Navbar>
      </BrowserRouter>
    </div>
  );
}

export default App;
