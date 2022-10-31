import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/main/Header";
import Emojis from "../../components/main/Emoji";
import Announcement from "../../components/main/Announcement";
import { useAppSelector } from "../../app/hooks";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function KakaoLogin() {
  const params = new URL(document.location).searchParams;
  const kakao_code = params.get("code");
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    id: "",
    name: "",
    profile: "",
  });

  const getToken = () => {
    fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=authorization_code&client_id=${"931a81a6fdb9751f2858ca6f2f46b377"}&redirect_uri=${"http://localhost:3000/"}&code=${kakao_code}`,
      //prompt={none}(?) 추가하면 자동로그인 된다 함
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.access_token) {
          localStorage.setItem("token", data.access_token);
        } else {
          navigate("/intro");
        }
        axios({
          method: "GET",
          url: `https://kapi.kakao.com/v2/user/me`,
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        }).then((res) => {
          const id = String(res.data.id);
          const data = new FormData();
          data.append("kakao_id", id);
          axios({
            method: "POST",
            url: `https://k7b103.p.ssafy.io/api/v1/accounts/kakao/`,
            data: data,
          })
            .then((result) => {
              if (result.status === 200) {
                localStorage.setItem("access_token", result.data.token.access);
                localStorage.setItem(
                  "refresh_token",
                  result.data.token.refresh
                );
              }
            })
            .catch((err) => {
              if (err.response.status === 401) {
                setInfo({
                  id: res.data.id,
                  name: res.data.kakao_account.profile.nickname,
                  profile: res.data.kakao_account.profile.profile_image_url,
                });
              } else {
                console.log("예상치 못한 에러군,,,");
              }
            });
        });
      });
  };

  useEffect(() => {
    if (!document.location.search) return;
    getToken();
  }, []);

  useEffect(() => {
    if (info.id !== "") {
      navigate("/kakaoSignup", { state: info });
    }
  }, [info]);
}

function Main() {
  const token = useAppSelector((state) => state.token.access);
  const family = useAppSelector((state) => state.family.id);
  const [scrum, setScrum] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: `https://k7b103.p.ssafy.io/api/v1/scrums/`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      setScrum(res.data);
    });
  }, [family]);

  return (
    <div>
      <Header></Header>
      <Emojis scrum={scrum}></Emojis>
      <Announcement scrum={scrum}></Announcement>
    </div>
  );
}

export default Main;
