import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useAppSelector } from "../../app/hooks";
import Header from "../../components/header";
import Comment from "../../components/scrum/Comment";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { Emoji } from "emoji-picker-react";

const Container = styled.div`
  margin: 5%;
`;

const DateBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56px;
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

const Profile = styled.div`
  display: flex;
  align-items: center;
`;
const UserImg = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 64px;
  margin: 4px;
  object-fit: fill;
`;
const NameEmojiBox = styled.div`
  margin: 4px 16px;
  p {
    font-size: 20px;
    margin: 4px auto;
  }
`;

const DayBox = styled.div`
  margin: 8px 0 12px 0;
  p {
    font-size: 18px;
    margin: 4px 0;
  }
`;
const TextBox = styled.div`
  padding: 8px 12px;
  border-radius: 15px;
  background-color: rgba(254, 199, 134, 0.25);
  color: #444444;
`;
const HrTag = styled.div`
  background-color: rgba(244, 175, 168, 0.5);
  height: 1px;
  margin: 32px 0 16px;
`;

function ScrumDetail() {
  //props 값
  const { state } = useLocation();
  const today = state.selectday
  console.log(today);
  // 날짜 설정
  const [date, setDate] = useState(new Date());
  useEffect(()=> {
      date.setFullYear(Number(today.slice(0,4)));
      date.setMonth(Number(today.slice(5,7)) - 1);
      date.setDate(Number(today.slice(8,10)));
    }, [])

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

  // redux 값 불러오는 곳
  const token = useAppSelector((state) => state.token.access);

  // 해당날짜, 해당 id 스크럼 요청
  const [scrum, setScrum] = useState({});
  const [blank, setBlank] = useState(false);
  useEffect(() => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_BACK_HOST}/scrums/${state.user_id}?created_at=${day}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.data) {
        setScrum(res.data);
        setBlank(false);
      } else {
        setBlank(true);
      }
    });
  }, [day]);

  return (
    <>
      <Header label={"안녕"} back="true"></Header>
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
      {blank === true ? (
        <Container>
          <Profile>
            <UserImg src={state.image}></UserImg>
            <NameEmojiBox>
              {state.set_name !== false ? (
                <p>
                  {state.set_name} ({state.name})
                </p>
              ) : (
                <p>{state.name}</p>
              )}
              <Emoji size={24} />
            </NameEmojiBox>
          </Profile>
          <DayBox>
            <p>🙄 어제 뭐했더라?</p>
            <TextBox>등록된 내용이 없습니다.</TextBox>
          </DayBox>
          <DayBox>
            <p>🙋🏻‍♂️ 가족들에게 한마디!</p>
            <TextBox>등록된 내용이 없습니다.</TextBox>
          </DayBox>
          <HrTag />
        </Container>
      ) : (
        <Container>
          <Profile>
            <UserImg src={state.image}></UserImg>
            <NameEmojiBox>
              {state.set_name !== false ? (
                <p>
                  {state.set_name} ({state.name})
                </p>
              ) : (
                <p>{state.name}</p>
              )}
              <Emoji unified={scrum.emoji} size={24} />
            </NameEmojiBox>
          </Profile>
          <DayBox>
            <p>🙄 어제 뭐했더라?</p>
            <TextBox>{scrum.yesterday}</TextBox>
          </DayBox>
          <DayBox>
            <p>🙋🏻‍♂️ 가족들에게 한마디!</p>
            <TextBox>{scrum.today}</TextBox>
          </DayBox>
          <HrTag />
          <Comment id={scrum.id} comments={scrum.comment}></Comment>
        </Container>
      )}
    </>
  );
}

export default ScrumDetail;
