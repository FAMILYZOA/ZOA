import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate} from 'react-router-dom';
import axios from "axios";



function Test() {
    const params = new URL(document.location).searchParams;
    const kakao_code = params.get('code');
    const navigate = useNavigate();
    const [token, setToken] = useState('')
    const [info, setInfo] = useState({
        id : '',
        name : '',
        profile : '',
    })
    
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
                setToken(data.access_token);
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
            .then((res) => {
                const id = String(res.data.id)
                const data = new FormData();
                data.append("kakao_id", id)
                axios({
                  method: "POST",
                  url: `https://k7b103.p.ssafy.io/api/v1/accounts/kakao/`,
                  data: data,
                }).then((result) => {
                    if (result.response.status === 201) {
                        console.log('로그인 완료');
                        
                    }
                }).catch((err) => {
                    if (err.response.status === 401) {
                        setInfo({
                          id: res.data.id,
                          name: res.data.kakao_account.profile.nickname,
                          profile:
                            res.data.kakao_account.profile.profile_image_url,
                        });
    
                    } else{
                        console.log('예상치 못한 에러군,,,');
                    }
                })
            }
            )
          )
    }

    useEffect(() => {
        if (!document.location.search) return;      
        getToken();
    }, [])

    useEffect(()=>{
        if (info.id !== "") {
          navigate('/kakaoSignup', { state: info });
        }
    },[info])


    return (
      <div>
        왜!!!
        <p>{kakao_code}</p>
        <p>{token}</p>
      </div>
    );
}
export default Test;