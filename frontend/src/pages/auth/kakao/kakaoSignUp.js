import React, { useEffect, useState } from "react";
import styled from "styled-components";
import kakaobtn from "../../../assets/kakaoBtn.png"
/*global Kakao*/


// const clickKakaoLogin = () => {

//   //일단 userAgent 를 가져와서, 네이티브 앱인지 알아오자.
//   if(/MY_HYBRID_APP/i.test(navigator.userAgent)) {
//     console.log('하이브리드앱에서 호출하였다.')
//     window.location.href = '/MY_KAKAO_LOGIN_URL';
//     return;
//   }
  
//   //일반적인 브라우저 환경이라면, 카카오 Javascript SDK 를 이용한 카카오로그인을 시도한다.
//   const Kakao = window.Kakao;
  
//   Kakao.Auth.login({
//     // success는 인증 정보를 응답(response)으로 받는다.
//     success: function (response) {
//       //카카오 SDK에 사용자 토큰을 설정한다.
//       window.Kakao.Auth.setAccessToken(response.access_token);
//       console.log(`is set?: ${window.Kakao.Auth.getAccessToken()}`);

//       var ACCESS_TOKEN = window.Kakao.Auth.getAccessToken();

//       window.Kakao.API.request({
//         url: "/v2/user/me",
//         success: function ({ kakao_account }) {
//           //어떤 정보 넘어오는지 확인
//           console.log(kakao_account);
//           const { email, profile } = kakao_account;

//           console.log(email);
//           console.log(`responsed img: ${profile.profile_image_url}`);
//           console.log(profile.nickname);
//         },
//         fail: function (error) {
//           console.log(error);
//         },
//       });
//     },
//     fail: function (error) {
//       console.log(error);
//     },
//   });
// }


const clickKakaoLogin = () => {
  Kakao.Auth.authorize({
    redirectUri :  'http://localhost:3000/'
  });  
}
 

function login() {
    return(
        <div>
            <div id="loginBtn" onClick={clickKakaoLogin}>
                <img src={kakaobtn} alt="" width="222" />
            </div>
        </div>
    )
}

export default login;