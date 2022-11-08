import * as React from "react";
import styled from "styled-components";
import { BiUser } from "react-icons/bi";
import { MdOutlineLock } from "react-icons/md";

import { customAxios } from "../../api/customAxios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setAccessToken } from "../../features/token/tokenSlice";


const LoginStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (min-width: 720px) {
    width: 70vh;
  }
`;

const HeaderStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
  height: 56px;
  width: 100%;
`;

// ZOA 로고에 그라데이션을 넣기 위한 styled component
const HeaderLogoStyle = styled.p`
  background: rgb(255, 120, 127);
  background-image: linear-gradient(
    90deg,
    rgba(255, 120, 127, 1) 0%,
    rgba(254, 199, 134, 1) 100%
  );

  background-size: 100%;
  background-repeat: repeat;

  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;

  font-size: 2.5rem;
  font-weight: bolder;
  margin: 0%;
`;

const FormStyle = styled.div`
  display: inline-block;

  margin-top: 20vh;
  margin-left: 10vw;
  margin-right: 10vw;
`;

const FormDescStyle = styled.p`
  display: flex;
  align-items: center;

  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 0.8rem;
  line-height: 100%;
  /* or 16px */

  margin-bottom: 4vh;

  letter-spacing: -0.01em;

  color: #000000;
`;

const InnerFormStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 6vh;
  width: 80vw;

  margin-top: 1vh;
  margin-bottom: 1vh;

  border: 1px solid #fad7d4;
  box-shadow: 0px 0px 4px #bebebe;
  border-radius: 10px;
`;

const IconStyle = styled.div`
  margin: 3vw;
`;

const InputStyle = styled.input`
  width: 65vw;
  margin-left: 5vw;
  margin-right: 5vw;

  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
  /* or 20px */

  display: flex;
  align-items: center;
  letter-spacing: -0.01em;

  color: #000000;

  border: none;
`;

// 자체 로그인 버튼에 관한 styled component
const InhouseLoginBtnStyle = styled.button`
  height: 6vh;
  width: 80vw;

  margin-top: 2vh;

  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  /* or 20px */

  letter-spacing: -0.01em;

  color: #ffffff;

  background: #ff787f;
  border-radius: 10px;
  border: none;
`;

// 카카오 로그인 버튼에 관한 styled component
const KakaoLoginBtnStyle = styled.button`
  height: 6vh;
  width: 80vw;

  margin-top: 2vh;

  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 0.8rem;
  line-height: 100%;
  /* identical to box height, or 16px */

  color: #471a00;

  background: #ffcd00;
  border-radius: 10px;
  border: none;
`;
const SignupOuterStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SignupStyle = styled(Link)`
  align-items: center;

  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 0.8rem;
  text-decoration: none;
  /* or 16px */

  letter-spacing: -0.01em;

  color: #707070;
`;

const FooterStyle = styled.p`
  position: absolute;
  width: 158px;
  height: 20px;
  top: 90vh;

  font-family: "Inter";
  font-style: normal;
  font-weight: 200;
  line-height: 100%;
  /* identical to box height, or 20px */

  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.02em;

  color: #000000;
`;

// ZOA 로고가 들어갈 헤더
const Header = () => {
  return (
    <HeaderStyle>
      <HeaderLogoStyle>ZOA</HeaderLogoStyle>
    </HeaderStyle>
  );
};

// 안내문 + 입력폼 + 전송 버튼
const Form = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [userToken, setUserToken] = useState<string>("");

  // 전화번호 입력 업데이트
  const handlePhone = (e: React.FormEvent<HTMLInputElement>) => {
    setPhone(
      e.currentTarget.value
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
        .replace(/(\-{1,2})$/g, "")
    );
  };

  // 비밀번호 입력 업데이트
  const handlePw = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const token = useAppSelector((state) => state.token.access); // redux로 중앙으로부터 token값을 가져온다.
  const dispatch = useAppDispatch(); // token값 변경을 위해 사용되는 메서드
  const navigate = useNavigate();

  // login
  const login = (phone: string, password: string) => {
    // 전화번호의 하이픈을 제거해야할지 말아야할지 상의 필요. -> 제거해서 전송
    const loginForm = new FormData();
    loginForm.append("phone", phone.replaceAll("-", ""));
    loginForm.append("password", password);

    console.log(loginForm.get("phone"));

    customAxios.post("accounts/login/", loginForm).then((response) => {
      setUserToken(response.data.token.access);
      dispatch(setAccessToken(response.data.token.access));
      alert("로그인 성공!");
      navigate('/scrum/create', {replace: true});
    }).catch((err) => {
      console.log(err);
      alert("로그인이 실패하였습니다.")
    });

  };

  return (
    <FormStyle>
      <FormDescStyle>전화번호와 비밀번호를 입력해주세요</FormDescStyle>
      <InnerFormStyle>
        <IconStyle>
          <BiUser size={"8vw"} />
        </IconStyle>

        <InputStyle
          type="text"
          value={phone}
          maxLength={13}
          placeholder="Phone"
          onChange={handlePhone}
        ></InputStyle>
      </InnerFormStyle>
      <InnerFormStyle>
        <IconStyle>
          <MdOutlineLock size={"8vw"} />
        </IconStyle>

        <InputStyle
          type="password"
          value={password}
          placeholder="Password"
          onChange={handlePw}
        ></InputStyle>
      </InnerFormStyle>
      <InhouseLoginBtnStyle onClick={() => login(phone, password)}>
        Sign in
      </InhouseLoginBtnStyle>
      <KakaoLoginBtnStyle>카카오 계정으로 시작하기</KakaoLoginBtnStyle>
      <SignupOuterStyle>
        <SignupStyle to={"/register"}>sign up</SignupStyle>
      </SignupOuterStyle>
    </FormStyle>
  );
};

const Login = () => {
  return (
    <LoginStyle>
      <Header></Header>
      <Form></Form>
      <FooterStyle>Copyright ⓒB103</FooterStyle>
    </LoginStyle>
  );
};

export default Login;
