import * as React from "react";
import styled from "styled-components";
import { customAxios } from "../../api/customAxios";
import Header from "../../components/header";
import DefaultProfile from "../../assets/defalut_profile.jpg"

export interface ISignUpProps {}

export interface IInnerFormProps {
  formName: string;
  formType: string;
  formEvent: React.ChangeEventHandler<HTMLInputElement>;
}

export interface IFormStates {
  name: string;
  phone: string;
  password: string;
  passwordConfirm: string;
  nextPage: boolean;
}

const FormStyle = styled.div`
  margin-top: 4vh;
`;

const InnerFormStyle = styled.div`
  display: inline-block;
  margin-top: 2vh;
`;

const FormNameStyle = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  /* or 16px */
  margin-top: 8px;
  margin-bottom: 8px;

  display: flex;
  align-items: center;
  letter-spacing: -0.01em;
`;

const FormInputStyle = styled.input`
  box-sizing: border-box;

  width: 80vw;
  height: 6vh;

  font-size: 24px;

  background: #ffffff;
  border: 2px solid #ff787f;
  box-shadow: 0px 0px 4px #bebebe;
  border-radius: 10px;
`;

const FormPicDescStyle = styled.p`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  /* or 16px */

  letter-spacing: -0.01em;

  color: #000000;
`;

const ProfileStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40vw;
  height: 40vw;


  border: 1px solid black;
  border-radius: 50%;
`;

const ButtonStyle = styled.button`
  margin-top: 20vh;
  width: 80vw;
  height: 6vh;

  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 100%;
  /* or 24px */

  letter-spacing: -0.01em;

  color: #ffffff;

  background: linear-gradient(92.7deg, #fec786 11.06%, #fe9b7c 92.72%);

  border-radius: 20px;
  border: none;
`;

const FooterStyle = styled.p`
  font-family: "Inter";
  font-style: normal;
  font-weight: 200;
  font-size: 20px;
  line-height: 100%;
  /* identical to box height, or 20px */

  letter-spacing: -0.02em;

  color: #000000;
`;

// 글자와 input form 한 세트
class InnerForm extends React.PureComponent<IInnerFormProps> {
  public render() {
    return (
      <InnerFormStyle>
        <FormNameStyle>{this.props.formName}</FormNameStyle>
        <FormInputStyle
          type={this.props.formType}
          onChange={this.props.formEvent}
        />
      </InnerFormStyle>
    );
  }
}

// 각 input 컴포넌트 (이름, 전화번호, 비밀번호, 비밀번호 확인) 묶음
class Form extends React.Component<ISignUpProps, IFormStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      password: "",
      passwordConfirm: "",
      nextPage: false,
    };
  }

  handleName = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      name: e.currentTarget.value,
    });
    console.log(this.state.name);
  };
  handlePhone = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      phone: e.currentTarget.value,
    });
    console.log(this.state.phone);
  };
  handlePassword = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      password: e.currentTarget.value,
    });
    console.log(this.state.password);
  };
  handlePasswordConfirm = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      passwordConfirm: e.currentTarget.value,
    });
    console.log(this.state.passwordConfirm);
  };

  goNext = () => {
    this.setState({
      nextPage: true,
    });
  };

  signUp = async () => {
    const signupForm = new FormData();
    signupForm.append("name", this.state.name);
    signupForm.append("phone", this.state.phone);
    signupForm.append("password", this.state.password);

    const response = await customAxios.post("accounts/signup/", signupForm);

    console.log(response);
  };

  public render() {
    return (
      <FormStyle>
        {this.state.nextPage ? (
          <div>
            <FormPicDescStyle>프로필 사진을 변경해보세요</FormPicDescStyle>
            <ProfileStyle> 사 진 넣 어 야 함</ProfileStyle>
            <p>생년월일</p>
            <div>
              <p>연</p>
              <p>월</p>
              <p>일</p>
            </div>
          </div>
        ) : (
          <div>
            <InnerForm
              formName="이름"
              formType="text"
              formEvent={this.handleName}
            ></InnerForm>
            <InnerForm
              formName="전화번호"
              formType="text"
              formEvent={this.handlePhone}
            ></InnerForm>
            <InnerForm
              formName="비밀번호"
              formType="password"
              formEvent={this.handlePassword}
            ></InnerForm>
            <InnerForm
              formName="비밀번호 확인"
              formType="password"
              formEvent={this.handlePasswordConfirm}
            ></InnerForm>
            <ButtonStyle onClick={this.goNext}>다음</ButtonStyle>
          </div>
        )}
      </FormStyle>
    );
  }
}

export default class Signup extends React.Component<ISignUpProps, IFormStates> {
  public render() {
    return (
      <div>
        <Header label="회원가입" back={true}></Header>
        <Form></Form>
        <FooterStyle>Copyright ⓒB103</FooterStyle>
      </div>
    );
  }
}
