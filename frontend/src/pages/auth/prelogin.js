import * as React from 'react';
import { useEffect } from "react";
import styled from "styled-components";
import symbol from "../../assets/symbol.png";
import {RiKakaoTalkFill} from 'react-icons/ri'
import { useNavigate } from 'react-router-dom';


const Prelogin = styled.div`
    display: grid;
    grid-template-rows: 2fr 1fr;
    height: 100vh;
`
const ImgBox = styled.div`
    @media screen and (min-width: 720px) {
        width: 70vh;
        margin: auto;
    }
    height: 70vh;
    background-color: gray;

`

const BtnBox = styled.div`
  @media screen and (min-width: 720px) {
    width: 70vh;
    margin: auto;
  }
  height: 30vh;
  .copyright {
    position: fixed;
    bottom: 4px;
    width: 100%;
    @media screen and (min-width: 720px) {
      width: 70vh;
    }
    margin: auto;
    text-align: center;
  }
`;
const Btn = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  width: 90%;
  height: 30%;
  border: none;
  border-radius: 10px;
  margin: 3% auto 0;
  @media screen and (min-width: 720px) {
    width: 60vh;
    margin: 3% auto 0;
  }
  font-size: 18px;
`;
const KakaoBtn = styled(Btn)`
  background-color: #FFCD00;
    
`;
const ZoaBtn = styled(Btn)`
  background: linear-gradient(90deg, #ff787f, #fec786);
`;
const IconBox = styled.div`
  margin: auto;
`;
const TextBox = styled.div`
    margin: auto;
`



function Btns(){
    const navigate = useNavigate();
    const NavZoa = () => {
        navigate(`/login`)
    }

    const clickKakaoLogin = () => {
      //일단 userAgent 를 가져와서, 네이티브 앱인지 알아오자.
      if (/MY_HYBRID_APP/i.test(navigator.userAgent)) {
        console.log("하이브리드앱에서 호출하였다.");
        window.location.href = "/MY_KAKAO_LOGIN_URL";
        return;
      }

      //일반적인 브라우저 환경이라면, 카카오 Javascript SDK 를 이용한 카카오로그인을 시도한다.
      const Kakao = window.Kakao;
      const redirectUri = "http://localhost:3000/";
      

      Kakao.Auth.login({
        redirectUri,
        // success는 인증 정보를 응답(response)으로 받는다.
        success: function (response) {
          //카카오 SDK에 사용자 토큰을 설정한다.
          window.Kakao.Auth.setAccessToken(response.access_token);
          console.log(`is set?: ${window.Kakao.Auth.getAccessToken()}`);

          var ACCESS_TOKEN = window.Kakao.Auth.getAccessToken();

          window.Kakao.API.request({
            url: "/v2/user/me",
            success: function ({ kakao_account }) {
              //어떤 정보 넘어오는지 확인
              console.log(kakao_account);
              const { email, profile } = kakao_account;

              console.log(email);
              console.log(`responsed img: ${profile.profile_image_url}`);
              console.log(profile.nickname);
            },
            fail: function (error) {
              console.log(error);
            },
          });
        },
        fail: function (error) {
          console.log(error);
        },
      });
    };




    return (
      <BtnBox>
        <KakaoBtn onClick={clickKakaoLogin}>
          <IconBox>
            <RiKakaoTalkFill size="28" color="#471A00" />
          </IconBox>
          <TextBox>
            <p color="#471A00">카카오계정으로 시작하기</p>
          </TextBox>
        </KakaoBtn>
        <ZoaBtn onClick={NavZoa}>
          <IconBox>
            <img src={symbol} alt="zoaSymbol" style={{ width: "24px" }} />
          </IconBox>
          <TextBox>
            <p>좋아계정으로 시작하기</p>
          </TextBox>
        </ZoaBtn>
        <p className="copyright">Copyright @B103</p>
      </BtnBox>
    );
}

function prelogin() {
  return(
    <Prelogin>
        <ImgBox>이미지넣어죠</ImgBox>
        <Btns></Btns>
      </Prelogin>
  )
}

export default prelogin;
