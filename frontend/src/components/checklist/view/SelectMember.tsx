import React from "react";
import styled from "styled-components";

const MemberDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 0.3em;
`;

const SelectedMemberProfileImg = styled.img`
  height: 3.2em;
  width: 3.2em;
  border-radius: 1.6em;
  object-fit: fill;
`;

const UnselectedGroup = styled.div`
  display: flex;
  width: 9em;
  flex-wrap: nowrap;
  overflow-x: hidden;
  float: right;
  flex-direction: row-reverse;
`;

const UnselectedMemberProfile = styled.div`
  width: auto;
  position: relative;
  margin-left: 0.2em;
  margin-top: 1.6em;
`;

const UnselectedMemberProfileImg = styled.img`
  height: 1.6em;
  width: 1.6em;
  border-radius: 0.8em;
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
