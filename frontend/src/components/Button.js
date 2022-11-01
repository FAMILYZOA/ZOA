import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 16px auto;
`;
// const Btn = styled.button`
//   width: 90%;
//   height: 64px;
//   margin: auto;
//   background: linear-gradient(45deg, #fec786, #fe9b7c);
//   border: none;
//   border-radius: 30px;
//   font-size: 20px;
//   font-weight: bold;
//   color: white;
// `;

const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Btn = styled.button`
  width: 90%;
  height: 64px;
  margin: auto;
  background: linear-gradient(45deg, #fec786, #fe9b7c);
  border: none;
  border-radius: 30px;
  font-size: 20px;
  font-weight: bold;
  color: white;
`;

function Button(props) {
  const { label, click, active } = props;
  return (
    <Container>
      <BtnBox>
        <Btn onClick={click}>{label}</Btn>
      </BtnBox>
    </Container>
  );
}

export default Button;
