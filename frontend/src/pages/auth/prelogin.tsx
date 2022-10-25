import * as React from 'react';
import styled from "styled-components";
import Header from '../../components/header';

export interface IAppProps {
}

const Box = styled.div`
  background: rgb(255, 120, 127);
`;


export default class App extends React.Component<IAppProps> {
  public render() {
    return (
      <Box>
        <p>혹시!?!!</p>
        <Header></Header>
      </Box>
    );
  }
}
