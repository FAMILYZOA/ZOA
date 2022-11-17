import React, { useEffect, useState } from "react";
import Header from "../../components/main/Header";
import Emojis from "../../components/main/Emoji";
import Announcement from "../../components/main/Announcement";
import CheckList from "../../components/main/checklist/CheckList";
import Dday from "../../components/main/Dday";
import { useAppSelector } from "../../app/hooks";
import axios from "axios";
import { AuthRefresh } from "../../api/customAxios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setAccessToken,
  setRefreshToken,
} from "../../features/token/tokenSlice";

function Main() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const access = useAppSelector((state) => state.token.access);
  const refresh = useAppSelector((state) => state.token.refresh);
  const family = useAppSelector((state) => state.family.id);
  const [scrum, setScrum] = useState([]);
  const [groupSchedule, setGroupSchedule] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("familyId")) {
      if (localStorage.getItem("access_token")) {
        const familyId = localStorage.getItem("familyId");
        navigate(`/join/${familyId}`);
      } else {
        navigate("/intro");
      }
    } else {
      if (!localStorage.getItem("access_token")) {
        navigate("/intro");
      }
    }
  }, []);

  // 디데이 날짜 설정
  const [date, setDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
    yoil: new Date().getDay(),
  });
  
  // 디데이 api 요청
  const getGroupSchedule = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_BACK_HOST}/calendar/Dday/${date.year}-${date.month}-${date.day}`,
      headers: {
        Authorization: `Bearer ${access}`
      },
    }).then((res) => {
      setGroupSchedule([...res.data])
    })
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_BACK_HOST}/scrums/`,
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
      .then((res) => {
        setScrum(res.data);
      })
      .catch(async (err) => {
        switch (err.response.status) {
          case 401:
            const code = err.response.data.code;
            if (code === "token_not_valid") {
              const tokens = await AuthRefresh(refresh).catch((err) => {

                navigate("/intro", { replace: true });
              });
              if (tokens) {
                dispatch(setAccessToken(tokens.access));
                dispatch(setRefreshToken(tokens.refresh));
              }
            }
            break;
          case 403:
            if (localStorage.getItem("familyId")) {
              const familyId = localStorage.getItem("familyId");
              navigate(`/join/${familyId}`);
            } else {
              navigate("family/select/");
            }
            break;
          default:
            break;
        }
      });
  }, [family]);

  useEffect(() => {
    getGroupSchedule();
  }, []);

  return (
    <div>
      <Header></Header>
      <Emojis scrum={scrum}></Emojis>
      <Dday groupSchedule={groupSchedule} date={date}/>
      <Announcement scrum={scrum}></Announcement>
      <CheckList />
    </div>
  );
}

export default Main;
