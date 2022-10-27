import { useState } from "react";
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

const NameEditInput = styled.input`
  border-left-width:0;
  　border-right-width:0;
  　border-top-width:0;
  　border-bottom:1;
  width: 80%;
  height: 30px;
  border-color: #ffd5d7;
  outline: 0;
`

const NameEditButton = styled.button`
border: 2px solid;
border-radius: 8px;
background-color: transparent;
border-color: #ffd5d7;
color: #ff787f;
font-size: 16px;
cursor: pointer;
`;

/*

props = {
  member: {
    customName: "사용자가 커스텀 설정한 이름",
    name: "본인이 설정한 이름"
    profileImg: "프로필 이미지"
  },
  edit: {
    isEdit: false,
  }
}

*/

const Member = {
  customName: "민정",
  name: "나",
}

const FamilyMemberEdit = () => {
  const NameResult = () => {
    // 커스텀 설정된 이름이 있는지 확인
    if (Member.customName !== "") {
      return `${Member.customName} (${Member.name})`;
    } else if (!Member.name) {
      return "";
    } else {
      return Member.name;
    }
  };

  // 이름 수정 창 여닫기
  const [edited, setEdited] = useState(false);
  // 나중에 api도 연결할 것
  const onClickEditButton = () => {
    setEdited(!edited);
  };

  return (
     <>
      <MemberInfo>
        <MemberProfile>
          {/* <MemberProfileImg src={props.member.profileImg}></MemberProfileImg> */}
          <MemberProfileImg src={'https://user-images.githubusercontent.com/97648026/197681280-abe13572-3872-4e99-8abe-41646cb91f2b.png'}></MemberProfileImg>
        </MemberProfile>
        <div>
          { edited === true ?
            <NameEditInput placeholder={Member.customName}></NameEditInput>
            : <div onClick={onClickEditButton}>{NameResult()}</div>}
        </div>
        <div>
          { edited === true ? <NameEditButton  onClick={onClickEditButton}>수정</NameEditButton> : <></>}
        </div>
      </MemberInfo>
    </>
  );
};

export default FamilyMemberEdit;
