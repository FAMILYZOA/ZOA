import * as React from "react";
import styled from "styled-components";
import Header from "../../components/header";

export interface ISignUpProps {}

export interface IInnerFormProps {
  formName: string;
  formType: string;
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

  background: linear-gradient(92.7deg, #FEC786 11.06%, #FE9B7C 92.72%);

  border-radius: 20px;
  border: none;
`;

const FooterStyle = styled.p`
font-family: 'Inter';
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
        <FormInputStyle type={this.props.formType} />
      </InnerFormStyle>
    );
  }
}

// 각 input 컴포넌트 (이름, 전화번호, 비밀번호, 비밀번호 확인) 묶음
class Form extends React.Component<ISignUpProps> {
  public render() {
    return (
      <FormStyle>
        <InnerForm formName="이름" formType="text"></InnerForm>
        <InnerForm formName="전화번호" formType="text"></InnerForm>
        <InnerForm formName="비밀번호" formType="password"></InnerForm>
        <InnerForm formName="비밀번호 확인" formType="password"></InnerForm>
      </FormStyle>
    );
  }
}

export default class Signup extends React.Component<ISignUpProps> {
  public render() {
    return (
      <div>
        <Header label="회원가입" back={true}></Header>
        <Form></Form>
        <ButtonStyle>다음</ButtonStyle>
        <FooterStyle>Copyright ⓒB103</FooterStyle>
      </div>
    );
  }
}
