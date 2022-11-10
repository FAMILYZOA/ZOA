import React from "react";
import styled from "styled-components";

const MemberInfo = styled.div`
  display: flex;
  margin-bottom: 0.8em;
  align-items: center;
`;
const MemberProfile = styled.div`
  height: 2.8em;
  width: 2.8em;
  border-radius: 1.4em;
  margin-right: 0.6em;
`;
const MemberProfileImg = styled.img`
  height: 2.8em;
  width: 2.8em;
  border-radius: 1.4em;
  object-fit: fill;
`;

const FamilyMember = (props: {
  member: { id: number; name: string; image: string; set_name: string };
}) => {
  const NameResult = () => {
    // 커스텀 설정된 이름이 있는지 확인
    if (props.member.set_name && props.member.set_name) {
      return `${props.member.set_name} (${props.member.name})`;
    } else if (!props.member.name) {
      return "";
    } else {
      return props.member.name;
    }
  };

  return (
    <>
      <MemberInfo>
        <MemberProfile>
          <MemberProfileImg src={props.member.image}></MemberProfileImg>
        </MemberProfile>
        <div>{NameResult()}</div>
      </MemberInfo>
    </>
  );
};

export default FamilyMember;
