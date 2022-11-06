import Header from "../../components/header";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import ScrumFamItem from "../../components/scrum/ScrumFamItem";
import axios from "axios";
import { useAppSelector } from "../../app/hooks";
import { Emoji } from "emoji-picker-react";

const ScrumBox = styled.div`
  height: calc(95vh - 180px);
  overflow-y: scroll;
  margin: 5%;
`;

const ScrumWrapper = styled.div`
  background-color: transparent;
  margin: 12px;
`;

const ItemWrapper = styled.div`
  background-color: #eefbef;
  padding: 4px 0;
`;

const ProfileWrapper = styled.div`
  color: red;
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
  const [curDate, setCurDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
  });

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

  const navigate = useNavigate();
  useEffect(() => {
    if (token.length === 0) {
      navigate("/intro");
    }
  }, [token]);

  useEffect(() => {
    axios({
      method: "get",
      url: `https://k7b103.p.ssafy.io/api/v1/scrums`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setScrums([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

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

  return (
    <>
      <Header label="안녕" />
      <div
        style={{
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          height: "56px",
        }}
      >
        <div
          style={{ color: "#ff787f", fontWeight: "bolder", fontSize: "3vh" }}
        >
          {curDate.year}. {curDate.month}. {curDate.date}
        </div>
      </div>
      {/* 내 스크럼 */}
      <ScrumBox>
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
          <div style={{ margin: "3%", fontWeight: "bold", fontSize: "16px" }}>
            {myScrum[0].name}
          </div>
          <div style={{ margin: "2% 0 0 0" }}>
            <Emoji unified={myScrum[0].emoji} size={20} />
          </div>
        </div>
        <div style={{ margin: "4px 0 4px 40px" }}>
          <ItemWrapper>
            {myScrum[0].emoji === "" ? (
              "아직 작성된 스크럼이 없어요 😢"
            ) : (
              <>
                <div style={{ margin: "8px", fontSize: "16px" }}>
                  🙋‍♂️ {myScrum[0].yesterday}
                </div>
                <div style={{ margin: "8px", fontSize: "16px" }}>
                  📢 {myScrum[0].today}
                </div>
              </>
            )}
          </ItemWrapper>
        </div>
        <div>
          {myScrum[0].emoji === "" ? (
            <div
              style={{
                color: "#ff787f",
                margin: "0px 0px 0px 20vw",
                cursor: "pointer",
                fontSize: "14px",
              }}
              onClick={() => {
                navigate(`/hello/create/`);
              }}
            >
              스크럼 작성하러 가기
              <BsChevronRight />
            </div>
          ) : (
            <></>
          )}
        </div>
        {/* 여기부터 가족 */}
        {famScrum.slice(0, -2).map((item) => (
          <ScrumFamItem {...item} key={item.user_id} />
        ))}
      </ScrumBox>
    </>
  );
};

export default ScrumHome;
