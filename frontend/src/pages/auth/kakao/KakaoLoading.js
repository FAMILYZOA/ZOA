import { RiKakaoTalkFill } from "react-icons/ri";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Background = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoadingText = styled.div`
  font: 2rem;
  text-align: center;
`;

function Loading() {
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
      body: `grant_type=authorization_code&client_id=${"931a81a6fdb9751f2858ca6f2f46b377"}&redirect_uri=${"http://localhost:3000/kakaoLoading/"}&code=${kakao_code}`,
      //prompt={none}(?) 추가하면 자동로그인 된다 함
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.access_token) {
          localStorage.setItem("token", data.access_token);
        } else {
          console.log("실패");
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
                navigate("/");
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

  return (
    <Background>
      <LoadingText>잠시만 기다려 주세요</LoadingText>
      <RiKakaoTalkFill size={40} color={"#F5C343"} />
    </Background>
  );
}

export default Loading;