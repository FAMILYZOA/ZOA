import React, { useEffect, useState } from "react";
import styled from "styled-components";

const MemberDiv = styled.div`
  display: flex;
  justify-content: space-between;
`

const SelectedMemberProfileImg = styled.img`
  height: 8vh;
  width: 8vh;
  border-radius: 4vh;
  object-fit: fill;
`;

const UnselectedGroup = styled.div`
  display: flex;
`

const UnselectedMemberProfile = styled.div`
  margin-left: 0.5vh;
  margin-top: 4vh;
`

const UnselectedMemberProfileImg = styled.img`
  height: 4vh;
  width: 4vh;
  border-radius: 2vh;
  object-fit: fill;
  opacity: 0.5;
`

type SelectMemberProps = {
  selectedMember: {id: number; name: string; image: string;};
  unSelectedMember: {id: number; name: string; image: string;}[];
  getModal: () => void;
}

function SelectMember( { selectedMember, unSelectedMember, getModal }: SelectMemberProps ){ // 선택되지 않은 멤버 리스트, 임시로 더미데이터
  const onClick = (id: number) => {
    console.log(`${id} clicked`);
    getModal();
  }

  return (
    <>
      <MemberDiv>
        <div>
          <SelectedMemberProfileImg src={selectedMember.image}/>
        </div>
        <UnselectedGroup>
          {unSelectedMember.map((member: any) => (
            <UnselectedMemberProfile key={member.id} 
              onClick={()=>(onClick(member.id))}
            >
              <UnselectedMemberProfileImg src={member.image}/>
            </UnselectedMemberProfile>
            ))}
        </UnselectedGroup>
      </MemberDiv>
    </>
  );
}

export default SelectMember;