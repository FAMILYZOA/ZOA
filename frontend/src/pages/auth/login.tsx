import * as React from "react";
import styled from "styled-components";
import { BiUser } from "react-icons/bi";
import { MdOutlineLock } from "react-icons/md";

import { customAxios } from "../../api/customAxios";
import { Link, Navigate, useNavigate } from "react-router-dom";

export interface ILoginProps {}

export interface ILoginState {
  phone: string;
  password: string;
}

const LoginStyle = styled.div`
  @media screen and (min-width: 720px) {
    width: 70vh;
  }
`;

const HeaderStyle = styled.div`
  background: #ffffff;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
  height: 56px;
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

  font-size: 48px;
  font-weight: bolder;
  margin: 0%;
`;

const FormStyle = styled.div`
  display: block;

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
  font-size: 16px;
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
  font-size: 20px;
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
  font-size: 20px;
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
  font-size: 16px;
  line-height: 100%;
  /* identical to box height, or 16px */

  color: #471a00;

  background: #ffcd00;
  border-radius: 10px;
  border: none;
`;

const SignupStyle = styled(Link)`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  text-decoration: none;
  /* or 16px */

  letter-spacing: -0.01em;

  color: #707070;
`;

// ZOA 로고가 들어갈 헤더
class Header extends React.Component<ILoginProps> {
  public render() {
    return (
      <HeaderStyle>
        <HeaderLogoStyle>ZOA</HeaderLogoStyle>
      </HeaderStyle>
    );
  }
}

// 안내문 + 입력폼 + 전송 버튼
class Form extends React.Component<ILoginProps, ILoginState> {
  constructor(props: any) {
    super(props);
    this.state = {
      phone: "",
      password: "",
    };
  }

  // 전화번호 입력 업데이트
  handlePhone = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      phone: e.currentTarget.value
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
        .replace(/(\-{1,2})$/g, ""),
    });
  };

  // 비밀번호 입력 업데이트
  handlePw = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      password: e.currentTarget.value,
    });
  };

  public render() {
    return (
      <FormStyle>
        <FormDescStyle>이메일과 비밀번호를 입력해주세요</FormDescStyle>
        <InnerFormStyle>
          <IconStyle>
            <BiUser size={"8vw"} />
          </IconStyle>

          <InputStyle
            type="text"
            value={this.state.phone}
            maxLength={13}
            placeholder="Phone"
            onChange={this.handlePhone}
          ></InputStyle>
        </InnerFormStyle>
        <InnerFormStyle>
          <IconStyle>
            <MdOutlineLock size={"8vw"} />
          </IconStyle>

          <InputStyle
            type="password"
            value={this.state.password}
            placeholder="Password"
            onChange={this.handlePw}
          ></InputStyle>
        </InnerFormStyle>
        <InhouseLoginBtnStyle
          onClick={() => AxiosTest(this.state.phone, this.state.password)}
        >
          Sign in
        </InhouseLoginBtnStyle>
        <KakaoLoginBtnStyle>카카오 계정으로 시작하기</KakaoLoginBtnStyle>

        <SignupStyle to={"/signup"}>sign up</SignupStyle>
      </FormStyle>
    );
  }
}

const AxiosTest = async (phone: string, password: string) => {
  // 전화번호의 하이픈을 제거해야할지 말아야할지 상의 필요. -> 제거해서 전송
  const loginForm = new FormData();
  loginForm.append("phone", phone.replaceAll("-", ""));
  loginForm.append("password", password);

  console.log(loginForm.get("phone"));

  const response = await customAxios.post("accounts/login/", loginForm);

  // 추후 처리
  console.log(response);
};

export default class Login extends React.Component<ILoginProps, ILoginState> {
  public render() {
    return (
      <LoginStyle>
        <Header></Header>
        <Form></Form>
        <p>Copyright ⓒB103</p>
      </LoginStyle>
    );
  }
}
