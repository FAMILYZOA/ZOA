import React from "react";
import styled from "styled-components";
import { FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0px;
  background-color: #ffcdbe;
  height: 56px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const FamilyName = styled.div`
    margin: 16px;
    font-size : 1.2rem;
    font-weight: bold;
    color: #ff787f;
`
const EditFamilyIcon = styled.div`
    margin: 16px;
`

function Header(){
    const navigate = useNavigate();
    const MoveFamilyEdit = () => {
        navigate('/family/manage')
    }
    return(
        <HeaderBox>
            <FamilyName><p>부리부리 패밀리</p></FamilyName>
            <EditFamilyIcon onClick={MoveFamilyEdit}><FaUsers size="24" color="#ff787f"/></EditFamilyIcon>
        </HeaderBox>
    )
}

export default Header;