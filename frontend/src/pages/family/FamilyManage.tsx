import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { ImLink, ImAddressBook } from "react-icons/im";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { AiFillHome } from "react-icons/ai";

import { FamilyMember } from "../../components/family";

import styled, { css, keyframes } from "styled-components";
import { detect } from "detect-browser";

const HeaderBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  position: sticky;
  top: 0px;
  background-color: #ffcdbe;
  height: 56px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const Icon = styled.div`
  margin: auto;
  display: flex;
  align-items: center;
`;

const HeaderLabel = styled.div`
  font-weight: bold;
  text-align: center;
  line-height: 56px;
`;

const FamilyManageBody = styled.div`
  padding: 4.5vmin;
`;
const FamilyManageGuide = styled.div`
  margin-top: 2.25vmin;
  margin-bottom: 6.5vmin;
  margin-left: 4px;
`;
const FamilyNameHighlight = styled.span`
  font-weight: bold;
`;

const FamilyInviteBox = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  margin-bottom: 2.25vmin;
  padding: 2.75vmin;
  border: 1px solid #ff787f;
`;

const IconBox = styled.div`
  width: 13vmin;
  height: 13vmin;
  border-radius: 6.5vmin;
  background: linear-gradient(150.19deg, #ff787f 9.11%, #fec786 93.55%);
  color: #fff;
  margin-right: 3.5vmin;
  line-height: 15.5vmin;
  text-align: center;
  font-size: 10vmin;
`;

const MessageBox20 = styled.div`
  margin-bottom: 1vmin;
`;
const MessageBox12 = styled.div`
  font-size: 3.5vmin;
`;
const FamilyMembersTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10vmin 0 4.5vmin;
  font-size: 4.5vmin;
  font-weight: bold;
`;

const MemberBox = styled.div`
  height: 110vmin;
  overflow-y: scroll;
`;

const FamilyMembersEdit = styled.div`
  font-size: 6.5vmin;
  font-weight: 400;
`;

const FamilyManage = () => {
  const familyMembersList = useAppSelector((state) => state.family.users);
  const token = useAppSelector((state) => state.token.access); // redux로 중앙으로부터 token값을 가져온다.
  const id = useAppSelector((state) => state.family.id);
  const familyName = useAppSelector((state) => state.family.name);
  const userName = useAppSelector((state) => state.user.name);
  const dispatch = useAppDispatch(); // token값 변경을 위해 사용되는 메서드

  // android 딥링크 설정 필요 -> firebase dynamic link 설정되면 사용
  const inviteLink: string = "(초대링크)";
  const os = detect()?.os;
  let smsUrl: string = `ZOA에서 초대장이 왔습니다!
${userName}님과 함께하세요!
${inviteLink}`;

  const navigate = useNavigate();
  const navigateToEdit = () => {
    navigate("/family/edit");
  };
  const navigateToHome = () => {
    navigate("/");
  };
  const sendMessage = () => {
    if (os === "Android OS") {
      window.location.href = `sms:?body=${smsUrl}`;
      if(window.ReactNativeWebView){
        window.ReactNativeWebView.postMessage(`inviteSMS,${smsUrl}`);
      }
    }else if(os === "iOS") {
      window.location.href = `sms:&body=${smsUrl}`
    }else{
      console.log("모바일 환경이 아닙니다.");
    }
  };
  const shareKakao = () => {
    try {
      // link를 우리 앱의 deeplink로 바꿔야 함.
      window.Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: `ZOA에서 초대장이 왔습니다!`,
          description: `${userName}님이 함께하고 싶어하셔요!`,
          imageUrl:
            "https://user-images.githubusercontent.com/97648026/197706989-acd007d6-05be-445c-8a70-ac98abeaee90.png",
          link: {
            mobileWebUrl: `/join/${id}`,
            webUrl: `/join/${id}`,
          },
        },
        buttons: [
          {
            title: "ZOA에 참여하기",
            link: {
              mobileWebUrl: "https://developers.kakao.com",
              webUrl: "https://developers.kakao.com",
            },
          },
        ],
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <HeaderBox>
        <Icon onClick={navigateToHome}>
          <AiFillHome size="24" color="#FF787F" />
        </Icon>
        <HeaderLabel>멤버 관리</HeaderLabel>
        <div></div>
      </HeaderBox>

      <FamilyManageBody>
        <FamilyManageGuide>
          <div>
            <FamilyNameHighlight>{familyName}</FamilyNameHighlight>에
          </div>
          <div>가족 초대하기</div>
        </FamilyManageGuide>
        <FamilyInviteBox onClick={shareKakao}>
          <IconBox>
            <ImLink />
          </IconBox>
          <div>
            <MessageBox20>초대링크 공유</MessageBox20>
            <MessageBox12>메신저로 공유하세요.</MessageBox12>
          </div>
        </FamilyInviteBox>
        <FamilyInviteBox onClick={sendMessage}>
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
        <MemberBox>
          {familyMembersList.map((member: any, index: any) => (
            <FamilyMember member={member} key={index}></FamilyMember>
          ))}
        </MemberBox>
      </FamilyManageBody>
    </>
  );
};

export default FamilyManage;
