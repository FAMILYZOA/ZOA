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
import Calendar from "./pages/calendar/Calendar";
import ScrumDetail from "./pages/scrum/ScrumDetail";

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
import {
  setChecklistPhoto,
  setFcmToken,
  setFcmTokenId,
  isFcmRegister,
  toggleUpload,
} from "./features/mobile/mobileSlice";
import { makeid, dataURLtoFile } from "./features/mobile/mobileUtil";
import { AuthRefresh } from "./api/customAxios";
import { setAccessToken, setRefreshToken } from "./features/token/tokenSlice";
import FamilyJoinSelect from "./pages/family/FamilyJoinSelect";
import FamilyCodeJoin from "./pages/family/FamilyCodeJoin";
import { VoiceView } from "./pages/voice";
import VoiceRecord from './pages/voice/VoiceRecord';
import NotFound from "./pages/error/NotFound";
import { detect } from "detect-browser";

function App() {
  const accessToken = useAppSelector((state) => state.token.access);
  const refreshToken = useAppSelector((state) => state.token.refresh);
  const userId = useAppSelector((state) => state.user.id);
  const familyId = useAppSelector((state) => state.family.id);
  const fontSize = useAppSelector((state) => state.setting.fontSize);

  const fcmToken = useAppSelector((state) => state.mobile.fcmToken);
  const isFcmRegist = useAppSelector((state) => state.mobile.isFcmRegist);
  const userName = useAppSelector((state) => state.user.name);

  const dispatch = useAppDispatch();
  const [, updateState] = useState<{}>();

  const fontArray = ["16px", "20px", "24px"];

  const [fontStyle, setFontStyle] = useState<{ fontSize: string }>({
    fontSize: fontArray[fontSize],
  });

  const infoUpdate = () => {
    if (accessToken === "") {
      // ????????? ?????? ??????
      if (userId >= 0) {
        // ?????? ??? ?????????. id ?????? ?????? ????????? ??????????????? ??????.
        dispatch(setUserId(-1));
        dispatch(setUserPhone(""));
        dispatch(setUserKakaoId(-1));
        dispatch(setUserFamilyId(-1));
        dispatch(setUserBirth(""));
        dispatch(setUserImage(""));
        dispatch(setUserName(""));
      }
      if (familyId >= 0) {
        // ????????? ??? ?????????. id ?????? ?????? ????????? ??????????????? ??????.
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
      }
    } else {
      // ?????? ?????? ?????????, ?????? ?????? ????????????
      axios({
        method: "get",
        url: `${process.env.REACT_APP_BACK_HOST}/accounts/profile/`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((res) => {
        dispatch(setUserId(res.data.id));
        dispatch(setUserPhone(res.data.phone));
        dispatch(setUserKakaoId(-1));
        dispatch(setUserFamilyId(res.data.family_id));
        dispatch(setUserBirth(res.data.birth));
        dispatch(setUserImage(res.data.image));
        dispatch(setUserName(res.data.name));
        if ( res.data.family_id >= 0) {
          // ?????? ????????? ?????????, ?????? ?????? ????????????
          axios({
            method: "get",
            url: `${process.env.REACT_APP_BACK_HOST}/family/${res.data.family_id}`,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }).then((res) => {
            if (res.data.id >= 0) {
              dispatch(setFamilyId(res.data.id));
              dispatch(setFamilyName(res.data.name));
              dispatch(setFamilyCreatedAt(res.data.created_at));
              dispatch(setFamilyUsers(res.data.users));
            }
          });
        }
      });
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

  // =================================================== ????????? ?????? ==============================================
  const os = detect()?.os;
  // React Native?????? ???????????? ????????? ??? ??????
  const getMessageFromDevice = (e: any) => {
    const data = JSON.parse(e.data);
    // ????????? ?????? BackEnd??? ?????? ?????? ?????????
    if (data.photo) {
      // ??????????????? ??????
      if (data.from === "profile") {
        uploadUserImage(data.photo);
      }
      if (data.from === "checklist") {
        dispatch(setChecklistPhoto(data.photo));
      }
    } else if (data.token) {
      dispatch(setFcmToken(data.token));
    }
  };

  // fcm ?????? ??????
  useEffect(() => {
    if(!isFcmRegist){
      axios({
        method: "POST",
        url: `${process.env.REACT_APP_BACK_HOST}/event/FCM/`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          user: {
            name: userName,
            family_id: familyId,
          },
          fcmToken: fcmToken,
          active: true,
        },
      })
        .then((res) => {
          console.log('fcm registered')
          dispatch(setFcmTokenId(res.data.id));
          dispatch(isFcmRegister(true));
        })
        .catch((err) => {
          // ?????? ?????? ????????? ????????? ??????
          if(err.response.status === 400){
            console.log('?????? ????????? ???????????? ????????????.')
          }
        });
    }
  }, [isFcmRegist])

  // ?????? ????????? ?????? ????????? ?????? ?????????????????? ????????????
  useEffect(() => {
    const fcmId = localStorage.getItem('fcmID');
    if(fcmId){
      dispatch(setFcmTokenId(fcmId));
      console.log('fcm loaded');
    }
  },[])

  // ????????? ????????? ????????? ?????????
  const uploadUserImage = (baseString: string) => {
    const filename = makeid(6);
    const image = dataURLtoFile(baseString, `${filename}.jpg`);

    const data = new FormData();
    data.append("image", image);



    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_BACK_HOST}/accounts/profile/`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
      data: data,
    })
      .then((res) => {
        console.dir(res)
        dispatch(toggleUpload(false));
        dispatch(setUserImage(res.data.image));
      })
      .catch(async (err) => {
        console.dir(err)
        switch (err.response.status) {
          case 401:
            const code = err.response.data.code;
            if (code === "token_not_valid") {
              const tokens = await AuthRefresh(refreshToken);
              //console.log(tokens);
              if (tokens) {
                dispatch(setAccessToken(tokens.access));
                dispatch(setRefreshToken(tokens.refresh));
              } else {
                dispatch(setAccessToken(""));
                dispatch(setRefreshToken(""));
              }
            }
            break;
          default:
            console.log(err);
            break;
        }
      });
  };

  window.__WEBVIEW_BRIDGE__ = {
    init() {
      try {
        console.log(os);
        if (os === "android" || os === "Android OS") {
          document.addEventListener("message", getMessageFromDevice);
        } else if (os === "iOS") {
          window.addEventListener("message", getMessageFromDevice);
        }
      } catch (err) {}
    },
  };

  useEffect(() => {
    // do stuff here...
    window.__WEBVIEW_BRIDGE__.init();
  }, []);

  // =================================================== ????????? ?????? ==============================================

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
          <Route path="/family/select" element={<FamilyJoinSelect />}></Route>
          <Route path="/family/code" element={<FamilyCodeJoin />}></Route>

          <Route path="/voice" element={<VoiceView />}></Route>
          <Route path="/voice/record" element={<VoiceRecord />}></Route>


          <Route path="/" element={<Main />} />

          <Route path="/hello/" element={<ScrumHome />}></Route>
          <Route path="/hello/create" element={<ScrumCreate />}></Route>
          <Route path="/hello/detail" element={<ScrumDetail />}></Route>

          <Route path="/checklist" element={<ReadChecklist />} />
          <Route path="/checklist/create" element={<CreateChecklist />} />

          <Route path="/calendar" element={<Calendar />} />

          <Route path="/settings" element={<Settings />} />

          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Navbar></Navbar>
      </BrowserRouter>
    </div>
  );
}

export default App;
