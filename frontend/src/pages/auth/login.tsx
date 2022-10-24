import * as React from 'react';
import styled from 'styled-components';

export interface ILoginProps {
}

export interface ILoginState {
}


// ZOA 로고가 들어갈 헤더
class Header extends React.Component<ILoginProps> {
  public render() {
    return (
      <div>
        <p> ZOA </p>
      </div>
    );
  }

}


export default class Login extends React.Component<ILoginProps, ILoginState> {
  constructor(props: ILoginProps) {
    super(props);

    this.state = {
    }

  }
  

  public render() {
    return (
      <div>
        <Header></Header>
      </div>
    );
  }

  
}
