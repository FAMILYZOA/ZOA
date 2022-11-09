import React from "react";
import styled from "styled-components";
import { FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0px;
  background-color: #ffcdbe;
  height: 56px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  z-index: 1;
`;

const FamilyName = styled.div`
  margin: 16px;
  font-size: 1.2em;
  font-weight: bold;
  color: #ff787f;
`;
const EditFamilyIcon = styled.div`
  margin: 16px;
`;

function Header() {
  const navigate = useNavigate();
  const familyName = useAppSelector((state) => state.family.name);
  const MoveFamilyEdit = () => {
    navigate("/family/manage");
  };
  return (
    <HeaderBox>
      <FamilyName>
        <p>{familyName}</p>
      </FamilyName>
      <EditFamilyIcon onClick={MoveFamilyEdit}>
        <FaUsers size="24" color="#ff787f" />
      </EditFamilyIcon>
    </HeaderBox>
  );
}

export default Header;
