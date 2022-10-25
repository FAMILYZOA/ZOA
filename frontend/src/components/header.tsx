import * as React from 'react';
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";

export interface IHeaderProps {
}

const HeaderBox = styled.div`
    
`

export default class Header extends React.Component<IHeaderProps> {
  public render() {
    return <HeaderBox>
        <IoIosArrowBack/>
    </HeaderBox>;
  }
}
