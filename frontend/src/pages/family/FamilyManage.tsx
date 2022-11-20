import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { ImLink, ImAddressBook } from "react-icons/im";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { AiFillHome } from "react-icons/ai";

import { FamilyMember } from "../../components/family";

import styled from "styled-components";
import { detect } from "detect-browser";
import { FaCode } from "react-icons/fa";
import axios from "axios";
import { IoMdClose } from "react-icons/io";

interface modalBackProps {
  toggle?: boolean;
}

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
  padding: 0.8em;
`;
const FamilyManageGuide = styled.div`
  margin-top: 0.4em;
  margin-bottom: 1.2em;
  margin-left: 4px;
`;
const FamilyNameHighlight = styled.span`
  font-weight: bold;
`;

const FamilyInviteBox = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  margin-bottom: 0.4em;
  padding: 0.5em;
  border: 1px solid #ff787f;
`;

const IconBox = styled.div`
  width: 2em !important;
  height: 2em;
  border-radius: 1em;
  background: linear-gradient(150.19deg, #ff787f 9.11%, #fec786 93.55%);
  color: #fff;
  margin-right: 0.6em;
  line-height: 2.2em;
  text-align: center;
  font-size: 1.2em;
`;

const MessageBox20 = styled.div`
  margin-bottom: 0.2em;
`;
const MessageBox12 = styled.div`
  font-size: 0.65em;
`;
const FamilyMembersTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1.8em 0 0.8em;
  font-size: 0.8em;
  font-weight: bold;
`;

const MemberBox = styled.div`
  height: calc(100vh - 20em - 56px);
  overflow-y: scroll;
`;

const FamilyMembersEdit = styled.div`
  font-size: 1.2em;
  font-weight: 400;
`;
const ModalBack = styled.div<modalBackProps>`
  position: absolute;
  width: 100%;
  height: calc(100vh - 56px);
  z-index: 2;
  background-color: rgba(102, 102, 102, 0.5);
  animation: fadein 0.5s;
  -moz-animation: fadein 0.5s;
  -webkit-animation: fadein 0.5s;
  -o-animation: fadein 0.5s;
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-moz-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-webkit-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-o-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
const ModalDiv = styled.div<modalBackProps>`
  position: absolute;
  padding: 20px;
  width: 70%;
  height: 22vh;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  border-radius: 12px;
  background-color: #fff;
  animation: fadein 0.5s;
  -moz-animation: fadein 0.5s;
  -webkit-animation: fadein 0.5s;
  -o-animation: fadein 0.5s;
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-moz-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-webkit-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-o-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
const ModalContent = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
const CloseDiv = styled.div`
  position: absolute;
  top: -0.25em;
  right: -0.25em;
  width: 1em;
  height: 1em;
`;
const Modal24 = styled.div`
  font-weight: 600;
  margin-bottom: 0.4em;
`;
const Modal16 = styled.div`
  font-size: 0.8em;
  margin-bottom: 0.8em;
`;
const ModalHighlight = styled.span`
  font-weight: bold;
  color: #ff787f;
`;
const Modal12 = styled.div`
  font-size: 0.6em;
  margin-bottom: 1.8em;
`;
const ConfrimButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 2em;
  font-size: 0.8em;
  color: #fff;
  background: linear-gradient(
    269.68deg,
    #ff787f 2.43%,
    #fec786 44.73%,
    #f6cc91 58.19%,
    #bbf1e8 94.73%
  );
  border-radius: 12px;
`;

const FamilyManage = () => {
  const familyMembersList = useAppSelector((state) => state.family.users);
  const accessToken = useAppSelector((state) => state.token.access); // redux로 중앙으로부터 token값을 가져온다.
  const id = useAppSelector((state) => state.family.id);
  const familyName = useAppSelector((state) => state.family.name);
  const userName = useAppSelector((state) => state.user.name);
  const dispatch = useAppDispatch(); // token값 변경을 위해 사용되는 메서드
  const [isModal, setIsModal] = useState(false);
  const navigate = useNavigate();

  // android 딥링크 설정 필요 -> firebase dynamic link 설정되면 사용
  const inviteLink: string = `${process.env.REACT_APP_FE_HOST}/join/${id}`;
  const os = detect()?.os;
  let smsUrl: string = `ZOA에서 초대장이 왔습니다!
${userName}님과 함께하세요!
${inviteLink}`;

  useEffect(() => {
    if (id < 0) {
      navigate("/");
    }
  }, [])

  const navigateToEdit = () => {
    navigate("/family/edit");
  };
  const navigateToHome = () => {
    navigate("/");
  };
  const sendMessage = () => {
    if (os === "Android OS") {
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(`inviteSMS,${smsUrl}`);
      } else {
        window.location.href = `sms:?body=${smsUrl}`;
      }
    } else if (os === "iOS") {
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(`inviteSMS,${smsUrl}`);
      } else {
        window.location.href = `sms:&body=${smsUrl}`;
      }
    }
  };
  const shareKakao = () => {
    const host = process.env.REACT_APP_FE_HOST;

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
            mobileWebUrl: `${host}/join/${id}`,
            webUrl: `${host}/join/${id}`,
          },
        },
        buttons: [
          {
            title: "ZOA에 참여하기",
            link: {
              mobileWebUrl: `${host}/join/${id}`,
              webUrl: `${host}/join/${id}`,
            },
          },
        ],
      });
    } catch (err) {}
  };
  const handleCopy = async (text: string) => {
    try {
      if (os === "iOS") {
        setTimeout(async () => await navigator.clipboard.writeText(text));
      } else if (os === "Android OS") {
        setTimeout(async () => await navigator.clipboard.writeText(text));
      } else {
        await navigator.clipboard.writeText(text);
      }
      setIsModal(true);
    } catch (error) {
      console.log(error);
      alert("코드복사가 실패하였습니다. 나중에 다시 시도해주세요.");
    }
  };
  const shareCode = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_BACK_HOST}/family/invitation_code/${id}/`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => {
      const code = res.data.invitationcode;
      handleCopy(code);
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
      {isModal && <ModalBack onClick={() => setIsModal(false)} />}
      {isModal && (
        <ModalDiv>
          <ModalContent>
            <div>
              <CloseDiv onClick={() => setIsModal(false)}>
                <IoMdClose />
              </CloseDiv>
              <Modal24>초대코드가 복사되었습니다!</Modal24>
              <Modal16>
                {"초대코드 유효기간은 "}
                <ModalHighlight>5분</ModalHighlight>
                {" 입니다."}
              </Modal16>
              <Modal12>위 주의사항을 확인 후 초대코드를 전달해주세요!</Modal12>
              <ConfrimButton onClick={() => setIsModal(false)}>
                <div>확인</div>
              </ConfrimButton>
            </div>
          </ModalContent>
        </ModalDiv>
      )}
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
        <FamilyInviteBox onClick={shareCode}>
          <IconBox>
            <FaCode />
          </IconBox>
          <div>
            <MessageBox20>초대코드 복사</MessageBox20>
            <MessageBox12>초대코드로 가족에 초대하세요.</MessageBox12>
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
