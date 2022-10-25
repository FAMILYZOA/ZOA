import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ImLink, ImAddressBook } from "react-icons/im";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { GrHomeRounded } from "react-icons/gr";

import { mdiHomeOutline } from "@mdi/js";
import { FamilyMember } from "../../components/family";

import styled, { css, keyframes } from "styled-components";

const FamilyManageHeader = styled.div`
  display: flex;
  height: 7.5vh;
  width: 100%;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid #aaa;
`;
const HomeButton = styled.div`
  position: absolute;
  top: 3.75vh;
  left: 3.75vh;
  height: 3vh;
  width: 3vh;
  transform: translate(-50%, -50%);
  border-radius: 1.5vh;
  font-size: 3vh;
  color: black;
`;

const FamilyManageHeaderTitle = styled.div`
  font-size: 3vh;
`;

const FamilyManageBody = styled.div`
  padding: 2vh;
`;
const FamilyManageGuide = styled.div`
  margin-top: 1vh;
  margin-bottom: 3vh;
  font-size: 2.5vh;
`;
const FamilyNameHighlight = styled.span`
  font-weight: bold;
`;

const FamilyInviteBox = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  margin-bottom: 1vh;
  padding: 1.25vh;
  border: 1px solid #ff787f;
`;

const IconBox = styled.div`
  width: 6vh;
  height: 6vh;
  border-radius: 3vh;
  background: linear-gradient(150.19deg, #ff787f 9.11%, #fec786 93.55%);
  color: #fff;
  margin-right: 1.5vh;
  line-height: 7vh;
  text-align: center;
  font-size: 3vh;
`;

const MessageBox20 = styled.div`
  font-size: 2.5vh;
  margin-bottom: 1.5vh;
`;
const MessageBox12 = styled.div`
  font-size: 1.5vh;
`;
const FamilyMembersTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 4.5vh 0 2vh;
  font-size: 2vh;
  font-weight: bold;
`;

const FamilyMembersEdit = styled.div`
  font-size: 3vh;
  font-weight: 400;
`;

const FamilyManage = () => {
  const [familyName, setFamilyName] = useState<string>("패밀리명");
  const [familyMembersList, setFamilyMemberList] = useState<any>([
    {
      customName: '나',
      name: '신짱아',
      profileImg: 'https://user-images.githubusercontent.com/97648026/197681280-abe13572-3872-4e99-8abe-41646cb91f2b.png',
    },
    {
      customName: '동생',
      name: '신짱구',
      profileImg: 'https://user-images.githubusercontent.com/97648026/197681290-d733b42c-bc46-4af7-b149-96dd02150234.png',
    },
    {
      customName: '',
      name: '봉미선',
      profileImg: 'https://user-images.githubusercontent.com/97648026/197681295-f9fe8c31-b9e3-4c6d-81e1-63b4df657f1b.png',
    }
  ]); // member는 object. 예시 이미지 입력

  const navigate = useNavigate();
  const navigateToEdit = () => {
    navigate("/family/edit")
  }

  return (
    <>
      <FamilyManageHeader>
        <HomeButton>
          <GrHomeRounded />
        </HomeButton>
        <FamilyManageHeaderTitle>멤버관리</FamilyManageHeaderTitle>
      </FamilyManageHeader>
      <FamilyManageBody>
        <FamilyManageGuide>
          <div>
            <FamilyNameHighlight>{familyName}</FamilyNameHighlight>에
          </div>
          <div>가족 초대하기</div>
        </FamilyManageGuide>
        <FamilyInviteBox>
          <IconBox>
            <ImLink />
          </IconBox>
          <div>
            <MessageBox20>초대링크 공유</MessageBox20>
            <MessageBox12>메신저로 공유하세요.</MessageBox12>
          </div>
        </FamilyInviteBox>
        <FamilyInviteBox>
          <IconBox>
            <ImAddressBook />
          </IconBox>
          <div>
            <MessageBox20>연락처 친구 초대</MessageBox20>
            <MessageBox12>
              주소록에 있는 친구에게 메시지를 보내세요.
            </MessageBox12>
          </div>
        </FamilyInviteBox>
        <FamilyMembersTitle>
          <div>멤버</div>
          <FamilyMembersEdit onClick={navigateToEdit}>
            <HiOutlinePencilAlt />
          </FamilyMembersEdit>
        </FamilyMembersTitle>
        {familyMembersList.map((member: any, index: any) => (
          <FamilyMember member={member}></FamilyMember>
        ))}
      </FamilyManageBody>
    </>
  );
};

export default FamilyManage;
