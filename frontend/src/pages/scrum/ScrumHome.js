import Header from "../../components/header";
import styled from "styled-components";
import { useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs"
import ScrumItem from "../../components/scrum/ScrumItem";
import ScrumFamItem from "../../components/scrum/ScrumFamItem";

const ScrumHome = () => {

const [curDate, setCurDate] = useState({
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  date: new Date().getDate(),
});

// 날짜 유효성 검사(1일이나 말일에 월 바뀌는거는 아직)
// 전 날로 가기
const onHandleBeforeDate = () => {
  setCurDate({...curDate, date: curDate.date -1});
};

// 다음날로 가기
const onHandleAfterDate = () => {
  setCurDate({...curDate, date: curDate.date +1});
};

  return(
    <>
      <Header/>
        <div style={{display: "inline-flex"}}>
          <div style={{justifyContent: "center", display: "flex"}}>
            {/* <BsChevronLeft onClick={onHandleBeforeDate}/> */}
            <BsChevronLeft/>
              <div style={{color: "#ff787f", fontWeight: "bolder", fontSize: "3vh"}}>
                {curDate.year}. {curDate.month}. {curDate.date}
              </div>
            {/* <BsChevronRight onClick={onHandleAfterDate}/> */}
            <BsChevronRight/>
            </div>
          </div>
          <div>
            <ScrumItem/>
          </div>
          <div>
            <ScrumFamItem></ScrumFamItem>
          </div>
    </>
  )
};

export default ScrumHome;