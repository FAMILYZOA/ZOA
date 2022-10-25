import * as React from 'react';
import Header from '../../components/header';

export interface ISignUpProps {
}

// 두 페이지로 나눠서 할지

// 각 input 컴포넌트 (이름, 전화번호, 비밀번호, 비밀번호 확인) 묶음
class Form extends React.Component<ISignUpProps> {
    public render() {
      return (
        <div></div>
      );
    }
  }


export default class Signup extends React.Component<ISignUpProps> {
  public render() {
    return (
      <div>
        <Header label='회원가입' back={true}></Header>
      </div>
    );
  }
}
