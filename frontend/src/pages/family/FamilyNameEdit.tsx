import styled from "styled-components";
// import FamilyMemberEdit from "../../components/family/FamilyMemberEdit";
import { useState } from "react";
import FamilyMemberEdit from "../../components/family/FamilyMemberEdit";

const FamilyMembersTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 4.5vh 0 2vh;
  font-size: 2vh;
  font-weight: bold;
`;

const NameEditButton = styled.button`
border: 2px solid;
border-radius: 8px;
background-color: transparent;
border-color: #ffd5d7;
color: #ff787f;
font-size: 16px;
cursor: pointer;
`
const MemberList = styled.div`
font-weight: bold;
`

const FamilyNameEdit = () => {

  // const [familyMembersList, setFamilyMemberList] = useState<any>([
  //   {
  //     customName: '나',
  //     name: '신짱아',
  //     profileImg: 'https://user-images.githubusercontent.com/97648026/197681280-abe13572-3872-4e99-8abe-41646cb91f2b.png',
  //   },
  //   {
  //     customName: '동생',
  //     name: '신짱구',
  //     profileImg: 'https://user-images.githubusercontent.com/97648026/197681290-d733b42c-bc46-4af7-b149-96dd02150234.png',
  //   },
  //   {
  //     customName: '',
  //     name: '봉미선',
  //     profileImg: 'https://user-images.githubusercontent.com/97648026/197681295-f9fe8c31-b9e3-4c6d-81e1-63b4df657f1b.png',
  //   }
  // ]); // member는 object. 예시 이미지 입력

  return (
    <>
      가족 이름 수정 페이지, 헤더자리
      <FamilyMembersTitle>
          <div>멤버</div>
        </FamilyMembersTitle>
        {/* {familyMembersList.map((member: any, index: any) => (
          <FamilyMemberEdit member={member} onClick={onClickEditButton}></FamilyMemberEdit>
        ))} */}
          <FamilyMemberEdit></FamilyMemberEdit>
    </>
  )
};

export default FamilyNameEdit;