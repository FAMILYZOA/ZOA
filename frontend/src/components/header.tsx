import * as React from 'react';
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";

export interface IHeaderProps {
    label: string;
    back: boolean;
}


const HeaderBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  position: sticky;
  top: 0px;
  background-color: #ffcdbe;
  height: 56px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const IconBox = styled.div`
    margin: auto;
`;

const HeaderLabel = styled.div`
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    line-height: 56px;
    
`

export default class Header extends React.Component<IHeaderProps> {
  public render() {
    return <HeaderBox>
        <IconBox>
            {this.props.back ? <IoIosArrowBack size="24"/> : <div></div>}
        </IconBox>
        <HeaderLabel>
            {this.props.label}
        </HeaderLabel>
        <div></div>
    </HeaderBox>;
  }
}
