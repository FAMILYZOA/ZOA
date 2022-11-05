import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { ImLink, ImAddressBook } from "react-icons/im";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { AiFillHome } from "react-icons/ai";

import { FamilyMember } from "../../components/family";

import styled, { css, keyframes } from "styled-components";

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
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  line-height: 56px;
`;

const FamilyManageBody = styled.div`
  padding: 2vh;
`;
const FamilyManageGuide = styled.div`
  margin-top: 1vh;
  margin-bottom: 3vh;
  margin-left: 4px;
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
  margin-bottom: 0.5vh;
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
  // const [familyMembersList, setFamilyMemberList] = useState<any>(); // member는 object. 예시 이미지 입력
  const familyMembersList = useAppSelector((state) => state.family.users);
  const token = useAppSelector((state) => state.token.access); // redux로 중앙으로부터 token값을 가져온다.
  const id = useAppSelector((state) => state.family.id);
  const familyName = useAppSelector((state) => state.family.name);
  const userName = useAppSelector((state) => state.user.name);
  const dispatch = useAppDispatch(); // token값 변경을 위해 사용되는 메서드

  useEffect(() => {
    if (token) {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_BACK_HOST}/family/${id}`,
        headers: {
          Authorization: token, // 토큰 값
        },
      })
        .then((res) => {
          console.log(res.data);
          console.log(process.env.REACT_APP_BACK_HOST);
          console.log(token);
          setFamilyMemberList(res.data.users);
          setFamilyName(res.data.name);
        })
        .catch((err) => {
          console.log(err);
          console.log(process.env.REACT_APP_BACK_HOST);
        });
    }
  }, [id, token]);

  const inviteLink: string = "(초대링크)";
  const userAgent = navigator.userAgent.toLocaleLowerCase(); // 기기 확인
  let smsUrl: string;

  if (userAgent.search("android") > -1) {
    // android 기기 여부 확인
    smsUrl = `sms:?body=${userName}님이 ZOA앱 초대장을 보내셨어요! /n 다음 링크를 통해 참여해 보세요! /n ${inviteLink}`;
  } else if (userAgent.search("iphone") > -1 || userAgent.search("ipad") > -1) {
    // ios 기기 여부 확인
    smsUrl = `sms:&body=${userName}님이 ZOA앱 초대장을 보내셨어요! /n 다음 링크를 통해 참여해 보세요! /n ${inviteLink}`;
  }

  const navigate = useNavigate();
  const navigateToEdit = () => {
    navigate("/family/edit");
  };
  const navigateToHome = () => {
    navigate("/");
  };
  const sendMessage = () => {
    window.location.href = smsUrl;
  };
  const shareKakao = () => {
    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: `ZOA에서 초대장이 왔습니다!`,
        description: `${userName}님이 함께하고 싶어하셔요!`,
        imageUrl:
          "https://user-images.githubusercontent.com/97648026/197706989-acd007d6-05be-445c-8a70-ac98abeaee90.png",
        link: {
          mobileWebUrl: "https://developers.kakao.com",
          webUrl: "https://developers.kakao.com",
        },
      },
      buttons: [
        {
          title: "ZOA에 참여하기",
          link: {
            mobileWebUrl: `/join/${id}`,
            webUrl: `/join/${id}`,
          },
        },
      ],
    });
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
        {familyMembersList.map((member: any, index: any) => (
          <FamilyMember member={member} key={index}></FamilyMember>
        ))}
      </FamilyManageBody>
    </>
  );
};

export default FamilyManage;
