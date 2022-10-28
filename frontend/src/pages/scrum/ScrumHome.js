import Header from "../../components/header";
import styled from "styled-components";
import { useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs"
import ScrumItem from "../../components/scrum/ScrumItem";

const ScrumHome = () => {

// 날짜 불러오기
const [date, setDate] = useState({
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  date: new Date().getDate(),
});

  return(
    <>
      <Header/>
        <div style={{display: "inline-flex"}}>
          <BsChevronLeft/>
          <div style={{color: "#ff787f", fontWeight: "bolder", fontSize: "3vh"}}>
            {date.year}. {date.month}. {date.date}
          </div>
          <BsChevronRight/>
          </div>
          <div>
            <ScrumItem/>
          </div>
          <div style={{color: "#ff787f"}}>
            스크럼 작성하러 가기 <BsChevronRight style={{cursor: "pointer"}}></BsChevronRight>
          </div>
    </>
  )
};

export default ScrumHome;