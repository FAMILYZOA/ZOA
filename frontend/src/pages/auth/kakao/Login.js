import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { MdOutlineLock } from "react-icons/md";
import { RiKakaoTalkFill } from "react-icons/ri";
import { useAppDispatch } from "../../../app/hooks";
import { customAxios } from './../../../api/customAxios';
import { setAccessToken, setRefreshToken } from "../../../features/token/tokenSlice";
import logo from "../../../assets/white-logo.png"
/*global Kakao*/


const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  background-color: #ffcdbe;
  height: 56px;
  box-shadow: rgba(255, 255, 255, 0.3) 0px 1px 4px;
  img{
    height: 32px;
  }
`;

const Container = styled.div`
    margin: 30% 5%;
    display: center;
    align-items: center;
    justify-content: center;
`

const Info = styled.p`
    margin: 32px 0;
`

const InputContainer = styled.div`
    margin: 8px 0;
`
const Title = styled.p`
    font-size: 16px;
    margin: 0 0 4px 8px;
`
const Warning = styled.p`
  font-size: 12px;
  margin: 4px 0 8px 8px;
  color: red;
  display: ${(props) => (props.active === false ? "none" : "block")};
`;


const InputBox = styled.div`
  width: 90%;
  height: 48px;
  border-radius: 30px;
  border: solid 1px #ff787f;
  padding: 0 5%;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Input = styled.input`
  width: 80%;
  height: 40px;
  border: none;
  background: none;
  font-size: 14px;
  outline: none;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 24px auto 16px;
`;
const Btn = styled.button`
  width: 90%;
  height: 56px;
  margin: auto;
  background: linear-gradient(45deg, #fec786, #fe9b7c);
  border: none;
  border-radius: 30px;
  font-size: 20px;
  font-weight: bold;
  color: white;
`;
const RegisterText = styled.p`
    margin: 8px;
    display: flex;
    justify-content: center;
    font-size: 14px;
    color: black;
`
const KakaoLogin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    font-size: 14px;
    color: #471a00;
    margin: 0;
  }
`;



function Login() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [phone, setPhone] = useState("");
    const [pw, setPw] = useState("");
    const [warn, setWarn] = useState(false);

    const onChangePhone = (e) => {
        setPhone(
          e.currentTarget.value
            .replace(/[^0-9]/g, "")
            .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
            .replace(/(\-{1,2})$/g, "")
        );
    }
    const onChangePw = (e) => {
        setPw(e.currentTarget.value)
    }
    const activeWarn = () => {
        setWarn(true)
    }
    const clickLogin = (phone, pw) => {
        console.log(phone, pw);
        const data = new FormData();
        data.append("phone", phone.replaceAll("-", ""));
        data.append("password", pw);

        customAxios.post("accounts/login/", data).then((res) => {
            dispatch(setAccessToken(res.data.token.access));
            dispatch(setRefreshToken(res.data.token.refresh));
            navigate("/", {replace:true});
        }).catch((err)=> {
            console.log(err)
            activeWarn()
        })
    }
    const clickKakaoLogin = () => {
      Kakao.Auth.authorize({
        redirectUri: `${process.env.REACT_APP_FE_HOST}/kakaoLoading/`,
      });
    };



    return (
      <div>
        <Header><img src={logo} alt="" /></Header>
        <Container>
          <div>
            <Info>휴대폰 번호와 비밀번호를 입력해주세요🙂</Info>
            <InputContainer>
              <InputBox>
                <BiUser size={20} color="707070" />
                <Input
                  type="text"
                  placeholder="Phone"
                  maxLength="13"
                  onChange={onChangePhone}
                  value={phone}
                ></Input>
              </InputBox>
            </InputContainer>
            <InputContainer>
              <InputBox>
                <MdOutlineLock size={20} color="707070" />
                <Input
                  type="password"
                  placeholder="Password"
                  onChange={onChangePw}
                  value={pw}
                ></Input>
              </InputBox>
            </InputContainer>
            <Warning active={warn}>
              입력하신 휴대폰 번호 또는 비밀번호가 정확하지 않습니다.
            </Warning>
            <BtnBox>
              <Btn onClick={() => clickLogin(phone, pw)}>로그인</Btn>
            </BtnBox>
            <Link to={"/register"} style={{ textDecoration: "none" }}>
              <RegisterText>
                {" "}
                <span style={{ color: "#FF787F" }}>ZOA </span> 회원가입
              </RegisterText>
            </Link>
            <KakaoLogin onClick={() => clickKakaoLogin(phone, pw)}>
              <RiKakaoTalkFill
                size={24}
                color={"#F5C343"}
                style={{ margin: "0 4px" }}
              />
              <p>카카오계정으로 로그인</p>
            </KakaoLogin>
          </div>
        </Container>
      </div>
    );
}

export default Login;