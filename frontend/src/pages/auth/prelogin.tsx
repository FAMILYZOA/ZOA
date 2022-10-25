import * as React from 'react';
import styled from "styled-components";
import Header from '../../components/header';

export interface IAppProps {
}
;

const Prelogin = styled.div`
`

export default class App extends React.Component<IAppProps> {
  public render() {
    return (
      <Prelogin>
        <Header label='프리로그인' back={true} ></Header>
      </Prelogin>
    );
  }
}
