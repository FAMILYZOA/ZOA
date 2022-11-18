import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { MdOutlineLock } from "react-icons/md";
import { RiKakaoTalkFill } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { customAxios } from "./../../../api/customAxios";
import {
  setAccessToken,
  setRefreshToken,
} from "../../../features/token/tokenSlice";
import {
  setUserFamilyId,
  setUserId,
  setUserKakaoId,
  setUserPhone,
  setUserBirth,
  setUserImage,
  setUserName,
} from "../../../features/user/userSlice";
import {
  setFamilyCreatedAt,
  setFamilyId,
  setFamilyName,
  setFamilyUsers,
} from "../../../features/family/familySlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import logo from "../../../assets/white-logo.png";
import axios from "axios";
import { isFcmRegister } from "../../../features/mobile/mobileSlice";
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
  img {
    height: 32px;
  }
`;

const Container = styled.div`
  margin: 30% 5%;
  display: center;
  align-items: center;
  justify-content: center;
`;

const Info = styled.p`
  font-size: 0.9em;
  margin: 32px 0;
`;

const InputContainer = styled.div`
  margin: 8px 0;
`;
const Title = styled.p`
  font-size: 16px;
  margin: 0 0 4px 8px;
`;
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
`;
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
  const familyId = useAppSelector((state) => state.family.id);

  //adf
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
  };
  const onChangePw = (e) => {
    setPw(e.currentTarget.value);
  };
  const activeWarn = () => {
    setWarn(true);
  };
  const clickLogin = (phone, pw) => {
    const data = new FormData();
    data.append("phone", phone.replaceAll("-", ""));
    data.append("password", pw);

    customAxios
      .post("accounts/login/", data)
      .then((res) => {
        const accessToken = res.data.token.access;
        const refreshToken = res.data.token.refresh;
        dispatch(setAccessToken(accessToken));
        dispatch(setRefreshToken(refreshToken));
        dispatch(isFcmRegister(false));
        axios({
          method: "get",
          url: `${process.env.REACT_APP_BACK_HOST}/accounts/profile/`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          dispatch(setUserId(res.data.id));
          dispatch(setUserPhone(res.data.phone));
          dispatch(setUserKakaoId(-1));
          dispatch(setUserFamilyId(res.data.family_id));
          dispatch(setUserBirth(res.data.birth));
          dispatch(setUserImage(res.data.image));
          dispatch(setUserName(res.data.name));
          if (familyId < 0 && res.data.family_id) {
            // 가족 정보가 없으면, 가족 정보 불러오기
            axios({
              method: "get",
              url: `${process.env.REACT_APP_BACK_HOST}/family/${res.data.family_id}`,
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            })
              .then((res) => {
                dispatch(setFamilyId(res.data.id));
                dispatch(setFamilyName(res.data.name));
                dispatch(setFamilyCreatedAt(res.data.created_at));
                dispatch(setFamilyUsers(res.data.users));
              })
          }
        navigate("/", { replace: true });
      })
      .catch((err) => {
        activeWarn();
      });
  })};
  const clickKakaoLogin = () => {
    Kakao.Auth.authorize({
      redirectUri: `${process.env.REACT_APP_FE_HOST}/kakaoLoading/`,
    });
    dispatch(isFcmRegister(false));
  };
  const onEnter = (e) => {
    if (e.key == "Enter") {
      clickLogin(phone, pw);
    }
  };

  return (
    <div>
      <Header>
        <img src={logo} alt="" />
      </Header>
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
                onKeyDown={onEnter}
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
                maxLength="20"
                value={pw}
                onKeyDown={onEnter}
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
