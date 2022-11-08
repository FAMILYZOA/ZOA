import React, { useEffect, useState } from "react";
import styled from "styled-components";

const MemberDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SelectedMemberProfileImg = styled.img`
  height: 17.5vmin;
  width: 17.5vmin;
  border-radius: 8.75vmin;
  object-fit: fill;
`;

const UnselectedGroup = styled.div`
  display: flex;
  width: 22.5vh;
  flex-wrap: nowrap;
  overflow-x: hidden;
  float: right;
`;

const UnselectedMemberProfile = styled.div`
  width: auto;
  position: relative;
  margin-left: 1vmin;
  margin-top: 9vmin;
`;

const UnselectedMemberProfileImg = styled.img`
  height: 9vmin;
  width: 9vmin;
  border-radius: 4.5vmin;
  object-fit: fill;
  opacity: 0.5;
`;

type SelectMemberProps = {
  selectedMember: { id: number; name: string; image: string };
  unSelectedMember: { id: number; name: string; image: string }[];
  getModal: () => void;
};

function SelectMember({
  selectedMember,
  unSelectedMember,
  getModal,
}: SelectMemberProps) {
  const count: number = unSelectedMember.length;
  // 선택되지 않은 멤버 리스트, 임시로 더미데이터
  const onClick = (id: number) => {
    console.log(`${id} clicked`);
    getModal();
  };

  return (
    <>
      <MemberDiv>
        <div>
          <SelectedMemberProfileImg src={selectedMember.image} />
        </div>
        <UnselectedGroup>
          {unSelectedMember.map((member: any) => (
            <UnselectedMemberProfile
              key={member.id}
              onClick={() => onClick(member.id)}
            >
              <UnselectedMemberProfileImg src={member.image} />
            </UnselectedMemberProfile>
          ))}
        </UnselectedGroup>
      </MemberDiv>
    </>
  );
}

export default SelectMember;
