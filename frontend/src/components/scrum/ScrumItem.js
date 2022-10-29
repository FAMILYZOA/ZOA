import styled from "styled-components";
import { useState } from "react";
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

const ScrumItem = () => {

  const navigate = useNavigate();

  return(
    <>
      <ScrumWrapper style={{display: "flex"}}>
        <ProfileWrapper>
          <MemberProfile>
            <MemberProfileImg/>
          </MemberProfile>
        </ProfileWrapper>
        <ItemWrapper>
          <div style={{margin: "1vh"}}>
           🙋‍♂️ 오늘은 금요일
          </div>
          <div style={{margin: "1vh"}}>
           📢 하지만 내겐 많은 잔업이 있소
          </div>
        </ItemWrapper>
      </ScrumWrapper>
      <div
        style={{color: "#ff787f", margin: "0px 0px 0px 20vw", cursor: "pointer"}}
        onClick={() => {
          navigate(`/`)
        }}
        >
        스크럼 작성하러 가기
        <BsChevronRight/>
      </div>
    </>
  )
};

export default ScrumItem;