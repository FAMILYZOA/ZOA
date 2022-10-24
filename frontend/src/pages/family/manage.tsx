import React, { Component } from "react";

import styled, { css, keyframes } from "styled-components";

const FamilyManageHeader = styled.div`
  display: flex;
  height: 7.5vh;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #aaa;
`
const HomeButton = styled.div`
  position: absolute;
  top: 3.75vh;
  left: 3.75vh;
  height: 3vh;
  width: 3vh;
  transform: translate(-50%, -50%);
  border-radius: 1.5vh;
  font-size: 3vh;
  color: black;
`

const FamilyManageHeaderTitle = styled.div`
  font-size: 3vh;
`

const FamilyManageBody = styled.div`
  padding: 2vh;
`
const FamilyManageGuide = styled.div`
  margin-top: 1vh;
  font-size: 2.5vh;
`
const FamilyNameHighlight = styled.div`
  font-weight: bold;
`

const FamilyManage = () => {
  return (
    <>
      <FamilyManageHeader>
        <HomeButton>
          <span className="mdi mdi-home-outline"></span>
        </HomeButton>
        <FamilyManageHeaderTitle>멤버관리</FamilyManageHeaderTitle>
      </FamilyManageHeader>
      <FamilyManageBody>
        <FamilyManageGuide>
          <div><FamilyNameHighlight>{}</FamilyNameHighlight>에</div>
          <div>가족 초대하기</div>
        </FamilyManageGuide>
      </FamilyManageBody>
    </>
  );
}

export default FamilyManage;