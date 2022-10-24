import * as React from "react";
import styled from "styled-components";

export interface ILoginProps {}

export interface ILoginState {}

const HeaderStyle = styled.div`
  border-bottom: 2px solid #000000;
`;

const Paragraph = styled.p`
  background: rgb(255,120,127);
  background-image: linear-gradient(90deg, rgba(255,120,127,1) 0%, rgba(254,199,134,1) 100%);

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

const InhouseLoginBtn = styled.button`
  background-color: #ff787f;
  border: none;
  color: white;
  padding: 10px 48px;
  text-align: center;
  font-weight: bold;
  display: inline-block;
  font-size: 16px;
  margin-bottom: 20px;
  border-radius: 10px;
`;

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

const InputLayout = styled.div`
  border: 5px solid rgba(244, 175, 168, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin-left: 20%;
  margin-right: 20%;
`;

const InputStyle = styled.input`
  border: none;
`;

// ZOA 로고가 들어갈 헤더
class Header extends React.Component<ILoginProps> {
  public render() {
    return (
      <HeaderStyle>
        <Paragraph>ZOA</Paragraph>
      </HeaderStyle>
    );
  }
}

// 안내문과 입력 폼
class Form extends React.Component<ILoginProps> {
  public render() {
    return (
      <div>
        <p>이메일과 비밀번호를 입력해주세요</p>
        <InputLayout><p>이메일</p><InputStyle></InputStyle></InputLayout>
        <InputLayout><p>비밀번호</p><InputStyle></InputStyle></InputLayout>
      </div>
    );
  }
}

// 로그인 버튼들 : 자체 / 카카오 로그인
class Buttons extends React.Component<ILoginProps> {
  public render() {
    return (
      <div>
        <InhouseLoginBtn>Sign in</InhouseLoginBtn>
        <br></br>
        <KakaoLoginBtn>카카오 계정으로 시작하기</KakaoLoginBtn>
        <p>sign up</p>
      </div>
    );
  }
}

export default class Login extends React.Component<ILoginProps, ILoginState> {
  constructor(props: ILoginProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return (
      <div>
        <Header></Header>
        <Form></Form>
        <Buttons></Buttons>
        <p>Copyright ⓒB103</p>
      </div>
    );
  }
}
