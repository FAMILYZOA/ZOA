import React from "react";
import styled, { css, keyframes } from "styled-components";

const MemberInfo = styled.div`
  display: flex;
  margin-bottom: 2vh;
  font-size: 2.5vh;
  align-items: center;
`;
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

/*

props = {
  member: {
    set_name: "사용자가 커스텀 설정한 이름",
    name: "본인이 설정한 이름"
    image: "프로필 이미지"
  },
}

*/

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
