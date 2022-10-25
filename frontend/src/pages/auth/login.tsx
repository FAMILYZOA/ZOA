import * as React from "react";
import styled from "styled-components";
import { BiUser } from "react-icons/bi";
import { MdOutlineLock } from "react-icons/md";

import { customAxios } from "../../api/customAxios";

export interface ILoginProps {}

export interface ILoginState {
  phone: string;
  password: string;
}

// header의 아래 경계선을 넣기 위한 styled component
const HeaderStyle = styled.div`
  border-bottom: 2px solid #000000;
`;

// ZOA 로고에 그라데이션을 넣기 위한 styled component
const LogoStyled = styled.p`
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

// 자체 로그인 버튼에 관한 styled component
const InhouseLoginBtn = styled.button`
  background-color: #ff787f;
  border: none;
  color: white;
  text-align: center;
  font-weight: bold;
  font-size: 16px;
  border-radius: 10px;
`;

// 카카오 로그인 버튼에 관한 styled component
const KakaoLoginBtn = styled.button`
  background-color: #ffcd00;
  color: #471a00;
  border: none;
  padding: 10px 48px;
  text-align: center;
  font-weight: bold;
  display: inline-block;
  font-size: 16px;
  margin: auto;
  border-radius: 10px;
`;

// 각 인풋 박스에 테두리를 넣기 위한 styled component
const InputLayout = styled.div`
  border: 5px solid rgb(250, 215, 212);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

// InputLayout 내부의 input 테두리를 없에기 위한 styled component
const InputStyle = styled.input`
  border: none;
`;

// input과 button 양 옆에 마진을 주기 위한 styled component
const BodyStyle = styled.div`
  margin-left: 10%;
  margin-right: 10%;
`;

// ZOA 로고가 들어갈 헤더
class Header extends React.Component<ILoginProps> {
  public render() {
    return (
      <HeaderStyle>
        <LogoStyled>ZOA</LogoStyled>
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

  // signup 클릭 시 이동
  handleClick = () => {
    window.location.href = "/signUp";
  };

  public render() {
    return (
      <div>
        <p>이메일과 비밀번호를 입력해주세요</p>
        <InputLayout>
          <BiUser />
          <InputStyle
            type="text"
            value={this.state.phone}
            maxLength={13}
            placeholder="Phone"
            onChange={this.handlePhone}
            
          ></InputStyle>
        </InputLayout>
        <InputLayout>
          <MdOutlineLock />
          <InputStyle
            type="password"
            value={this.state.password}
            placeholder="Password"
            onChange={this.handlePw}
          ></InputStyle>
        </InputLayout>
        <InhouseLoginBtn
          onClick={() => AxiosTest(this.state.phone, this.state.password)}
        >
          Sign in
        </InhouseLoginBtn>
        <KakaoLoginBtn>카카오 계정으로 시작하기</KakaoLoginBtn>
        <p onClick={this.handleClick}>sign up</p>
      </div>
    );
  }
}

const AxiosTest = async (phone: string, password: string) => {
  // 전화번호의 하이픈을 제거해야할지 말아야할지 상의 필요.
  const tempForm = new FormData();
  tempForm.append("phone", phone);
  tempForm.append("password", password);

  const response = await customAxios.post("accounts/login/", tempForm);

  console.log(response);
};

export default class Login extends React.Component<ILoginProps, ILoginState> {
  public render() {
    return (
      <div>
        <Header></Header>
        <BodyStyle>
          <Form></Form>
        </BodyStyle>
        <p>Copyright ⓒB103</p>
      </div>
    );
  }
}
