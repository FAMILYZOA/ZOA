import React from "react";
import styled from "styled-components";
import {FaUsers} from "react-icons/fa";


const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0px;
  background-color: #ffcdbe;
  height: 56px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const FamilyName = styled.div`
    font-size : 24px;
    font-weight: bold;
    color: #ff787f;
`
const EditFamilyIcon = styled.div`
    
`

function Header(){
    return(
        <HeaderBox>
            <FamilyName><p>부리부리 패밀리</p></FamilyName>
            <EditFamilyIcon><FaUsers size="24" color="#ff787f"/></EditFamilyIcon>
        </HeaderBox>
    )
}

export default Header;