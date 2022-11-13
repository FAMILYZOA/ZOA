import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useAppSelector } from "../../app/hooks";
import { BsChevronLeft, BsChevronRight, } from "react-icons/bs";
import Modal from "./Modal";

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

    return(
        <>
            {modalOpen &&
            <Modal
              setModalOpen={setModalOpen}
              schedule={schedule}
              date={modalDate}
            >
                </Modal>}
            {/* 연, 월 이동 */}
            <div style={{display: "flex"}}>
                <BsChevronLeft onClick={onHandleBeforeMonth} />
                <div>
                    {presDate.getFullYear()}. {presDate.getMonth() + 1}
                </div>
                <BsChevronRight onClick={onHandleAfterMonth} />
            </div>
            {/* 요일 */}
            <WeeklyWrapper style={{display: "flex"}}>
                {weekly.map((item, index) => {
                    return <div weekly key={index}>{item}</div>
                })}
            </WeeklyWrapper>
            {/* 달력 그리기 */}
            <MonthWrapper>
                {before.map((item, index) => {
                    return (
                        <NotMonthDay key={index}>
                            <CalendarDate>{item}</CalendarDate>
                        </NotMonthDay>
                    )
                })}
                {calendar.map((item, index) => {
                    return (
                        <OnMonthDay key={index}>
                            <CalendarDate
                                onClick={()=>showModal(item)}
                            >{item}</CalendarDate>
                        </OnMonthDay>
                    )
                })}
                {after.map((item, index) => {
                    return (
                        <NotMonthDay key={index}>
                            <CalendarDate>{item}</CalendarDate>
                        </NotMonthDay>
                    )
                })}
            </MonthWrapper>
        </>
    )
};

    const WeeklyWrapper = styled.div`
        display: grid;
        gird-template-rows: repeat(7, 1fr);
    `

    const MonthWrapper = styled.div`
        display: grid;
        grid-template-columns: repeat(7, 1fr);
    `

    const NotMonthDay = styled.div`
        color: #bebebe;
    `

    const OnMonthDay = styled.div`
        color: black;
    `

    const CalendarDate = styled.div`
        display: flex;
        justify-content: center;

        color: ${(props) => props.color};
    `


export default MonthlyCalendar;