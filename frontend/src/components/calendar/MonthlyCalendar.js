import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useAppSelector } from "../../app/hooks";
import { BsChevronLeft, BsChevronRight, } from "react-icons/bs";
import Modal from "./Modal";

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





const MonthlyCalendar = (props) => {
    const {year, month, setYearAndMonth} = props;

    // redux 값 불러오는 곳
    const token = useAppSelector((state) => state.token.access)

    const weekly = ["일", "월", "화", "수", "목", "금", "토"];

    const [presDate, setPresDate] = useState(new Date(year, month - 1));  // 현재 날짜
    const [calendar, setCalendar] = useState([]);  // 현재 달 날짜 채우기
    const [before, setBefore] = useState([]);  // 이전 달 날짜 채우기
    const [after, setAfter] = useState([]);  // 다음 달 날짜 채우기
    const [schedule, setSchedule] = useState([]);  // 이번 달 일정 채우기
    const [howday, setHowday] = useState(0);


    // 월별 일정 조회 api 요청
    const getSchedule = async () => {
        axios({
            method: "GET",
            url: `https://k7b103.p.ssafy.io/api/v1/calendar/schedule/${year}-${month}`,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((res) => {
            setSchedule(res.data)
        })
    };

    // 오늘 날짜 찾기
    const [today, setToday] = useState(0);
    const goToday = () => {
        let TODAY = new Date().getDate();
        setToday(TODAY);
    };

    useEffect(() => {
        getSchedule();
        getCalendar();
        setYearAndMonth(presDate.getFullYear(), presDate.getMonth() + 1);
        goToday();
    }, [presDate]);

    // 달력 그리기
    const getCalendar = () => {
        const year = presDate.getFullYear();
        const month = presDate.getMonth() + 1;
        const beforeDay = new Date(year, month - 1, 1).getDay();  // 1일의 요일
        const afterDay = new Date(year, month, 0).getDate();  // 현재 달의 마지막 일
        const afterDays = (7 - ((afterDay + beforeDay) % 7)) % 7;  // 다음 달 칸 채우기

        const before = new Array(beforeDay);
        for (let i = 0; i < beforeDay; i++) {
            before[i] = new Date(year, month - 1, -beforeDay + i + 1).getDate();
        }
        const after = new Array(afterDays);
        for (let i = 0; i < afterDays; i++) {
            after[i] = new Date(year, month - 1, i + 1).getDate();
        }
        let calendar = [];
        calendar = [...Array(afterDay + 1).keys()].slice(1);

        setHowday((before.length + after.length + calendar.length)/7);
        console.log(howday);
        setBefore([...before])
        setAfter([...after])
        setCalendar([...calendar])
    };
    

    // 한 달 전으로
    const onHandleBeforeMonth = () => {
        setPresDate(
            new Date(
                presDate.getFullYear(),
                presDate.getMonth() - 1,
                presDate.getDate(),
            )
        )
    };

    // 한 달 뒤로
    const onHandleAfterMonth = () => {
        setPresDate(
            new Date(
                presDate.getFullYear(),
                presDate.getMonth() + 1,
                presDate.getDate(),
            )
        )
    };
    const [modalDate, setModalDate] = useState("");

    // 모달 설정
    const [modalOpen, setModalOpen] = useState(false);
    const showModal = (date) => {
        setModalOpen(true);
        setModalDate(date);
    };

    return (
      <>
        {modalOpen && (
          <Modal
            setModalOpen={setModalOpen}
            schedule={schedule}
            date={modalDate}
          ></Modal>
        )}
        <HeaderBox>
          <div></div>
          <HeaderLabel>가족 캘린더</HeaderLabel>
          <></>
        </HeaderBox>
        {/* 연, 월 이동 */}
        <DateBox>
          <ArrowIconBox onClick={onHandleBeforeMonth} active={true}>
            <BsChevronLeft />
          </ArrowIconBox>
          <DateValue>
            {presDate.getFullYear()}. {presDate.getMonth() + 1}
          </DateValue>
          <ArrowIconBox active={true} onClick={onHandleAfterMonth}>
            <BsChevronRight />
          </ArrowIconBox>
        </DateBox>
        {/* 요일 */}
        <WeeklyWrapper>
          {weekly.map((item, index) => {
            return (
              <div weekly key={index}>
                <WeekText color={item}>{item}</WeekText>
              </div>
            );
          })}
        </WeeklyWrapper>
        {/* 달력 그리기 */}
        <MonthWrapper>
          {before.map((item, index) => {
            return (
              <NotMonthDay key={index}>
                <CalendarDate howweek={howday}>{item}</CalendarDate>
              </NotMonthDay>
            );
          })}
          {calendar.map((item, index) => {
            return (
              <OnMonthDay key={index}>
                <CalendarDate howweek={howday} onClick={() => showModal(item)}>
                  {item}
                </CalendarDate>
              </OnMonthDay>
            );
          })}
          {after.map((item, index) => {
            return (
              <NotMonthDay key={index}>
                <CalendarDate howweek={howday}>{item}</CalendarDate>
              </NotMonthDay>
            );
          })}
        </MonthWrapper>
        <MinMargin></MinMargin>
      </>
    );
};

    const WeeklyWrapper = styled.div`
        width: 100%;
        display: grid;
        grid-template-columns: repeat(7, 1fr);
    `
    const WeekText = styled.div`
      display: flex;
      justify-content: center;
      margin: 3vh auto;
      color: ${(props) => props.color === "일" ? "#FF787F" : (props.color === "토" ? "#3DB9A4" : "black")};
    `;

    const MonthWrapper = styled.div`
      display: grid;
      grid-template-columns: repeat(7, 1fr);

    `;

    const NotMonthDay = styled.div`
        color: #bebebe;
    `

    const OnMonthDay = styled.div`
        color: black;
    `

    const CalendarDate = styled.div`
        display: flex;
        justify-content: center;
        @media screen and (max-height:740px){
            margin: 0 auto 60px;
        }
        margin: ${props => props.howweek === 5 ? " 0 auto 10vh" : "0 auto 8vh"};
        color: ${(props) => props.color};
    `
    const MinMargin = styled.div`
        height: 64px;
    `


export default MonthlyCalendar;