import React from "react";
import styled from "styled-components";

const HeaderStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
  height: 56px;
  width: 100%;
`;

const HeaderLogoStyle = styled.p`
  background: rgb(255, 120, 127);
  background-image: linear-gradient(
    90deg,
    rgba(255, 120, 127, 1) 0%,
    rgba(254, 199, 134, 1) 100%
  );

  background-size: 100%;
  background-repeat: repeat;

  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;

  font-size: 2.5em;
  font-weight: bolder;
  margin: 0%;
`;

const Header = () => {
  return (
    <HeaderStyle>
      <HeaderLogoStyle>ZOA</HeaderLogoStyle>
    </HeaderStyle>
  );
};

const FamilyJoinSelect = () => {
  return (
    <>
      <Header />
    </>
  )
}

export default FamilyJoinSelect;