import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/white-logo.png";

const HeaderStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
  height: 64px;
  width: 100%;
`;
const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  background-color: #ffcdbe;
  height: 56px;
  box-shadow: rgba(255, 255, 255, 0.3) 0px 1px 4px;
  img {
    height: 32px;
  }
`;
const Greetings = styled.div`
  text-align: center;
  font-size: 2.4em;
  margin-bottom: 1em;
  font-weight: 700;
`
const Guide = styled.div`
  width: 80%;
  margin: 0 auto 1.6em;
  font-size: 0.8em;

  color: #707070;
  line-height: 1.3em;
`
const JoinContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20vh 0 0;
`
const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1em;
`;
const FamilyCreateBtn = styled.button`
  width: 90%;
  height: 56px;
  margin: auto;
  background: #fec786;
  border: none;
  border-radius: 16px;
  font-weight: bold;
  font-size: 1.1em;
  color: white;
`;
const FamilyParticipateBtn = styled.button`
  width: 90%;
  height: 56px;
  margin: auto;
  background: #fe9b7c;
  border: none;
  border-radius: 16px;
  font-weight: bold;
  font-size: 1.1em;
  color: white;
`;



const FamilyJoinSelect = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header>
        <img src={logo} alt="" />
      </Header>
      <JoinContents>
        <div style={{width: "100vw"}}>
          <Greetings>어서오세요!</Greetings>
          <Guide>가족 생성/참여하여 <br /> 구성원들과 하루를 공유해보세요!</Guide>
          <BtnBox>
            <FamilyCreateBtn onClick={() => {navigate("/family/create")}}>
              가족 생성하기
            </FamilyCreateBtn>
          </BtnBox>
          <BtnBox>
            <FamilyParticipateBtn onClick={() => {navigate("/family/code")}}>
              참여코드로 참여하기
            </FamilyParticipateBtn>
          </BtnBox>
        </div>
      </JoinContents>
    </>
  )
}

export default FamilyJoinSelect;