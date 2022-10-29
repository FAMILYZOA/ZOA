import { escapeRegExp } from "lodash";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

/*global Kakao*/


function Test() {
    const params = new URL(document.location).searchParams;
    const kakao_code = params.get('code');
    const navigate = useNavigate();
    
    const getToken =() => {
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
              console.log("실패");
              navigate("/intro");
            }
          })
          .then(
            axios({
              method: "GET",
              url: `https://kapi.kakao.com/v2/user/me`,
              headers: {
                  "Authorization" : `Bearer ${localStorage.token}`
              },
            })
            .then(
                res => console.log(res)
            )
          )
          
        //   .then((data)=> {
        //     console.log(data);
        //   })
          
    }

    useEffect(() => {
        if (!document.location.search) return;      
        getToken();
    }, [])


    return (
      <div>
        왜!!!
        <p>{kakao_code}</p>
      </div>
    );
}
export default Test;