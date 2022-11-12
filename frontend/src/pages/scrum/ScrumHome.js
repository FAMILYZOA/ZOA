import Header from "../../components/header";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import ScrumFamItem from "../../components/scrum/ScrumFamItem";
import axios from "axios";
import { useAppSelector } from "../../app/hooks";
import { Emoji } from "emoji-picker-react";
import { BsQuestionCircleFill } from "react-icons/bs";
import guide from "../../assets/hello_guide.png"
import Modal from "react-modal";


const ImgTag = styled.img`
  object-fit: fill;
  width: 100%;
  height: 100%;
  margin: 0;
`

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
  font-size: 1.25em;
  font-weight: bold;
  text-align: center;
  line-height: 56px;
`;



const DateBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  background-color: rgba(255, 255, 255, 0.5);
`;
const ArrowIconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  margin: 4px;
  color: ${(props) => (props.active === true ? "black" : "#bebebe")};
`;
const DateValue = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ff787f;
  font-size: 20px;
  font-weight: bold;
  margin: auto 40px;
`;

const ItemWrapper = styled.div`
  background-color: #eefbef;
  padding: 4px 4px;
  font-size: 0.8em;
  border-radius: 10px;
`;

const ProfileWrapper = styled.div`
  color: black;
`;

const MemberProfile = styled.div`
  height: 32px;
  width: 32px;
  border-radius: 3.5vh;
  margin-right: 8px;
`;
const MemberProfileImg = styled.img`
  height: 32px;
  width: 32px;
  border-radius: 3.5vh;
  object-fit: fill;
`;

const ScrumHome = () => {
  // 날짜 설정
  const [date, setDate] = useState(new Date());
  const day =
    date.getFullYear() +
    "-" +
    ("00" + (date.getMonth() + 1).toString()).slice(-2) +
    "-" +
    ("00" + date.getDate().toString()).slice(-2);

  // 전 날로 가기
  const onHandleBeforeDate = () => {
    setDate(new Date(date.setDate(date.getDate() - 1)));
  };

  // 다음날로 가기
  const onHandleAfterDate = () => {
    setDate(new Date(date.setDate(date.getDate() + 1)));
  };

  // 받아온 값 저장
  const [scrums, setScrums] = useState([
    {
      image: "",
      yesterday: "",
      today: "",
    },
  ]);

  // redux 값 불러오는 곳
  const token = useAppSelector((state) => state.token.access);
  const userId = useAppSelector((state) => state.user.id);
  const userImg = useAppSelector((state) => state.user.image);
  const userName = useAppSelector((state) => state.user.name);
  const familyId = useAppSelector((state) => state.family.id);

  const navigate = useNavigate();
  useEffect(() => {
    if (token.length === 0) {
      navigate("/intro");
    }
  }, [token]);

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_BACK_HOST}/scrums/?search=${day}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      setScrums([...res.data]);
    });
  }, [day]);

  // 내 스크럼 저장할 state 선언
  const myScrum = useState({
    emoji: "",
    yesterday: "",
    today: "",
    image: "",
    id: "",
    user_id: "",
  });

  // 가족 스크럼 저장할 state 선언
  const famScrum = useState({
    emoji: "",
    yesterday: "",
    today: "",
    image: "",
    id: "",
    user_id: "",
    set_name: "",
  });

  // 받아온 스크럼 data에서 스크럼 작성 id 와 유저 id 비교하기
  let j = 0;
  for (j = 0; j < scrums.length; j++) {
    if (scrums[j].user_id === userId) {
      myScrum.unshift(scrums[j]);
    }
    if (scrums[j].user_id !== userId) {
      famScrum.unshift(scrums[j]);
    }
  }

  const [showModal, setShowModal] = useState(false);  
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const modalStyle = {
    content: {
      inset:" 2% 2%",
      width: "96%",
      height: "96%",
      border: "none",
      backgroundColor: "rgba(0,0,0,0)",
      display: "flex",
      justifyContent: "center",
      padding: "0"
    },
  };

  const moveToDetail = () => {
    navigate("/hello/detail", {
      state: {
        image: myScrum[0].image,
        id: myScrum[0].id,
        user_id: myScrum[0].user_id,
        set_name: "나",
        name: userName,
      },
    });
  };

  return (
    <>
      <Modal
        isOpen={showModal}
        ariaHideApp={false}
        onRequestClose={closeModal}
        style={modalStyle}
        onClick={closeModal}
      >
        <ImgTag src={guide} alt="" onClick={closeModal} />
      </Modal>
      <HeaderBox>
        <div></div>
        <HeaderLabel>안녕</HeaderLabel>
        <Icon onClick={openModal}>
          <BsQuestionCircleFill size="24" color="#ff787f" />
        </Icon>
      </HeaderBox>
      <DateBox>
        <ArrowIconBox onClick={onHandleBeforeDate} active={true}>
          <BsChevronLeft />
        </ArrowIconBox>
        <DateValue>
          {date.getFullYear()}. {date.getMonth() + 1}. {date.getDate()}
        </DateValue>
        {date.getFullYear() === new Date().getFullYear() &&
        date.getMonth() === new Date().getMonth() &&
        date.getDate() === new Date().getDate() ? (
          <ArrowIconBox active={false}>
            <BsChevronRight />
          </ArrowIconBox>
        ) : (
          <ArrowIconBox active={true} onClick={onHandleAfterDate}>
            <BsChevronRight />
          </ArrowIconBox>
        )}
      </DateBox>
      <div style={{ margin: "5%" }}>
        <div
          style={{
            height: "calc(100vh - 190px)",
            margin: "auto",
            overflowY: "scroll",
          }}
        >
          {myScrum[0].emoji !== "" ? (
            <div onClick={moveToDetail}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <ProfileWrapper>
                  <MemberProfile>
                    {myScrum[0].image === "" ? (
                      <MemberProfileImg src={userImg} />
                    ) : (
                      <MemberProfileImg src={myScrum[0].image} />
                    )}
                  </MemberProfile>
                </ProfileWrapper>
                <div
                  style={{
                    margin: "3%",
                    fontWeight: "bold",
                    fontSize: "0.8em",
                  }}
                >
                  나 ({userName})
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Emoji unified={myScrum[0].emoji} size={20} />
                </div>
              </div>
              <div style={{ margin: "4px 0 4px 40px" }}>
                <ItemWrapper>
                  {myScrum[0].emoji === "" ? (
                    <>
                      <div style={{ margin: "8px" }}>
                        작성된 안녕이 없습니다.
                      </div>
                      {date.getFullYear() === new Date().getFullYear() &&
                      date.getMonth() === new Date().getMonth() &&
                      date.getDate() === new Date().getDate() ? (
                        <div style={{ margin: "8px" }}>
                          가족과 오늘의 안녕을 공유해보세요🥰{" "}
                        </div>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <>
                      <div style={{ margin: "8px" }}>
                        🙋‍♂️ {myScrum[0].yesterday}
                      </div>
                      <div style={{ margin: "8px" }}>📢 {myScrum[0].today}</div>
                    </>
                  )}
                </ItemWrapper>
              </div>
            </div>
          ) : (
            <>
              <div style={{ display: "flex", alignItems: "center" }}>
                <ProfileWrapper>
                  <MemberProfile>
                    {myScrum[0].image === "" ? (
                      <MemberProfileImg src={userImg} />
                    ) : (
                      <MemberProfileImg src={myScrum[0].image} />
                    )}
                  </MemberProfile>
                </ProfileWrapper>
                <div
                  style={{
                    margin: "3%",
                    fontWeight: "bold",
                    fontSize: "0.8em",
                  }}
                >
                  나 ({userName})
                </div>
              </div>
              <div style={{ margin: "4px 0 4px 40px" }}>
                <ItemWrapper>
                  {myScrum[0].emoji === "" ? (
                    <>
                      <div style={{ margin: "8px" }}>
                        작성된 안녕이 없습니다.
                      </div>
                      {date.getFullYear() === new Date().getFullYear() &&
                      date.getMonth() === new Date().getMonth() &&
                      date.getDate() === new Date().getDate() ? (
                        <div style={{ margin: "8px" }}>
                          가족과 오늘의 안녕을 공유해보세요🥰{" "}
                        </div>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <>
                      <div style={{ margin: "8px" }}>
                        🙋‍♂️ {myScrum[0].yesterday}
                      </div>
                      <div style={{ margin: "8px" }}>📢 {myScrum[0].today}</div>
                    </>
                  )}
                </ItemWrapper>
              </div>
            </>
          )}

          <div>
            {myScrum[0].emoji === "" &&
            date.getFullYear() === new Date().getFullYear() &&
            date.getMonth() === new Date().getMonth() &&
            date.getDate() === new Date().getDate() ? (
              <div
                style={{
                  color: "#ff787f",
                  margin: "0px 0px 8px 44px",
                  cursor: "pointer",
                  fontSize: "0.7em",
                }}
                onClick={() => {
                  navigate(`/hello/create/`);
                }}
              >
                '안녕' 작성하러 가기
                <BsChevronRight />
              </div>
            ) : (
              <></>
            )}
          </div>
          {/* 여기부터 가족 */}
          {familyId > 0 ? (
            famScrum
              .slice(0, -2)
              .map((item, index) => <ScrumFamItem {...item} key={index} />)
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default ScrumHome;
