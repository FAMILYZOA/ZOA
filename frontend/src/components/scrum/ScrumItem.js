import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

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

const ScrumItem = ({myScrum}) => {
  
  const navigate = useNavigate();
  const userImg = useAppSelector((state) => state.user.image)
  return(
    <>
      <ScrumWrapper style={{display: "flex"}}>
        <ProfileWrapper>
          <MemberProfile>
            {myScrum[0].image === "" ? (
              <MemberProfileImg src={userImg}/>
            ) : (
              <MemberProfileImg src={myScrum[0].image}/>
            )}
          </MemberProfile>
        </ProfileWrapper>
        <ItemWrapper>
          {myScrum[0].emoji === "" ? (
              "아직 작성된 스크럼이 없어요 😢"
            ) : (
            <>
              <div style={{margin: "1vh"}}>
              🙋‍♂️ {myScrum[0].yesterday}
              </div>
              <div style={{margin: "1vh"}}>
              📢 {myScrum[0].today}
              </div>
            </>
          )}
        </ItemWrapper>
      </ScrumWrapper>
      <div
        style={{color: "#ff787f", margin: "0px 0px 0px 20vw", cursor: "pointer"}}
        onClick={() => {
          navigate(`/hello/create/`)
        }}
        >
        스크럼 작성하러 가기
        <BsChevronRight/>
      </div>
    </>
  )
};

export default ScrumItem;