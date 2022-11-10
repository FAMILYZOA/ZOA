import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";



function Test() {
  const params = new URL(document.location).searchParams;
  const kakao_code = params.get("code");
  const navigate = useNavigate();
  const [token, setToken] = useState("");
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
      body: `grant_type=authorization_code&client_id=${"931a81a6fdb9751f2858ca6f2f46b377"}&redirect_uri=${process.env.REACT_APP_FE_HOST}&code=${kakao_code}`,
      //prompt={none}(?) 추가하면 자동로그인 된다 함
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.access_token) {
          setToken(data.access_token);
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
            url: `${process.env.REACT_APP_BACK_HOST}/accounts/kakao/`,
            data: data,
          })
            .then((result) => {
              if (result.status === 200) {
                localStorage.setItem("access_token", result.data.token.access);
                localStorage.setItem("refresh_token", result.data.token.refresh);
              }
            })
            .catch((err) => {
              if (err.response.status === 401) {
                setInfo({
                  id: res.data.id,
                  name: res.data.kakao_account.profile.nickname,
                  profile: res.data.kakao_account.profile.profile_image_url,
                });
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
    <div>
      
    </div>
  );
}
export default Test;
