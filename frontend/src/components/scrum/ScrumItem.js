import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const ScrumWrapper = styled.div`
  background-color: transparent;
  margin: 12px;
`

const ItemWrapper = styled.div`
  background-color: #eefbef;
`

const ProfileWrapper = styled.div`
  color: red;
`

const MemberProfile = styled.div`
  height: 7vh;
  width: 7vh;
  border-radius: 3.5vh;
  margin-right: 1.5vh;
`;
const MemberProfileImg = styled.img`
  height: 7vh;
  width: 7vh;
  border-radius: 3.5vh;
  object-fit: fill;
`;

const ScrumItem = ({scrums}) => {

  const navigate = useNavigate();
  // useEffect(()=>{
  //   console.log(scrums);
  // },[scrums])

  return(
    <>
      <ScrumWrapper style={{display: "flex"}}>
        <ProfileWrapper>
          <MemberProfile>
            <MemberProfileImg src={scrums.image}/>
          </MemberProfile>
        </ProfileWrapper>
        <ItemWrapper>
          <div style={{margin: "1vh"}}>
           🙋‍♂️ {scrums.yesterday}
          </div>
          <div style={{margin: "1vh"}}>
           📢 {scrums.today}
          </div>
        </ItemWrapper>
      </ScrumWrapper>
      <div
        style={{color: "#ff787f", margin: "0px 0px 0px 20vw", cursor: "pointer"}}
        onClick={() => {
          navigate(`/scrum/create/`)
        }}
        >
        스크럼 작성하러 가기
        <BsChevronRight/>
      </div>
    </>
  )
};

export default ScrumItem;