import React, { useEffect, useState } from "react";
import Header from "../../components/main/Header";
import Emojis from "../../components/main/Emoji";
import Announcement from "../../components/main/Announcement";
import CheckList from "../../components/main/checklist/CheckList";
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
      } else if (family < 0) {
        navigate("/family/create");
      }
    }
  }, []);

  useEffect(() => {
    axios({
      method: "GET",
      url: `https://k7b103.p.ssafy.io/api/v1/scrums/`,
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
                console.log(err);
                navigate("/intro", { replace: true });
              });
              console.log(tokens);
              if (tokens) {
                dispatch(setAccessToken(tokens.access));
                dispatch(setRefreshToken(tokens.refresh));
              }
            }
            break;
          case 403:
            console.log(localStorage.getItem("familyId"));
            if (localStorage.getItem("familyId")) {
              const familyId = localStorage.getItem("familyId");
              navigate(`/join/${familyId}`);
            } else {
              console.log("여기");
              navigate("family/create/");
            }
            break;
          default:
            break;
        }
      });
  }, [family]);

  return (
    <div>
      <Header></Header>
      <Emojis scrum={scrum}></Emojis>
      <Announcement scrum={scrum}></Announcement>
      <CheckList />
    </div>
  );
}

export default Main;
