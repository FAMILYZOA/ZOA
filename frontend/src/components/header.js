import * as React from 'react';
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";

// 사용 시
// <Header label="할 일 등록" back="true"></Header>
// 이렇게 해주세용 !!!!!!

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

function Header(props){
  return(
    <HeaderBox>
        <IconBox>
            {props.back === 'true' ? <IoIosArrowBack size="24"/> : <div></div>}
        </IconBox>
        <HeaderLabel>
            {props.label}
        </HeaderLabel>
        <div></div>
    </HeaderBox>
  )
}

export default Header;